'use strict';

var Buffer = require('buffer').Buffer;

function SendGridEmail(apiUser, apiKey) {
    this._buffers = [];

    this.property('api_user', apiUser);
    this.property('api_key', apiKey);
}

var boundary = 'UniqueEnoughString';

SendGridEmail.prototype.property = function(key, value) {
    this._buffers.push(
        new Buffer(
            '--' + boundary + '\n' +
            'Content-Disposition: form-data; name="' + key +'"\n\n' +
            value + '\n'
        )
    );
    return this;
}

SendGridEmail.prototype.attach = function(name, type, buffer) {
    this._buffers.push(
        new Buffer(
            '--' + boundary + '\n' +
            'Content-Disposition: form-data; name="files\\[' + name + '\\]"; filename="' + name + '"\n' +
            'Content-Type: ' + type + '\n\n'
        )
    );
    this._buffers.push(buffer);
    this._buffers.push(new Buffer('\n'));
    return this;
}

SendGridEmail.prototype.send = function() {
    this._buffers.push( new Buffer('--' + boundary + '--') );

    return Parse.Cloud.httpRequest({
        url: 'https://api.sendgrid.com/api/mail.send.json',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + boundary
        },
        body: Buffer.concat(this._buffers)
    });
}

function SendGridMailer(apiUser, apiKey) {
    this.apiUser = apiUser;
    this.apiKey = apiKey;
}

SendGridMailer.prototype.mail = function() {
    return new SendGridEmail(this.apiUser, this.apiKey);
}

module.exports = SendGridMailer;

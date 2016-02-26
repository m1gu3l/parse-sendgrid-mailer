# parse-sendgrid-mailer
Parse.com Cloud Code module for sending emails using SendGrid API

### Features
* easy-to-use chainable API
* no dependencies
* sends attachments

### Usage
```
// include mailer.js in your cloud code
var Mailer = require('path/to/mailer.js');

var mailer = new Mailer('sendgridApiUser', 'sendgridApiKey');

mailer
  .mail()
  .property('from', 'sender@sender.com')
  .property('to', 'receiver@receiver.org')
  .property('subject', 'Message with attachment')
  .property('text', 'Lorem ipsum dolor sit amet')
  .attach('hellokitty.png', 'image/png', fileBuffer)
  .send()
  .then(function(sendgridApiHttpResponse) {
    console.log('Maybe I should buy @m1gu3l a beer?');
  });

```
--- or ---
```
mailer
  .mail()
  .property('from', 'sender@sender.com')
  .property('to', 'receiver@receiver.org')
  .jsonProperty('x-smtpapi', { // https://sendgrid.com/docs/API_Reference/SMTP_API/index.html
    filters: {
      templates: {
        settings: {
          enable: 1,
          template_id: ''
        }
      }
    },
    sub: {
      '{user_firstname}': ['Receiver'],
      '{user_lastname}': ['Smith'],
      '{user_age}': ['28']
    }
  })
  .property('subject', ' ') // subject is required by SendGrid
  .property('html', ' ') // either text or html is required by SendGrid
  .send();
```

### How to get file buffer?
```
Parse.Cloud.httpRequest('http://domain.net/assets/file.zip')
  .then(function(httpResponse) {
    httpResponse.buffer // <---- file contents here
  });
```

# parse-sendgrid-mailer
Parse.com Cloud Code module

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

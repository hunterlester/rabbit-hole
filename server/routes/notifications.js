import express from 'express';
var Mailgun = require('mailgun-js');
const router = express.Router();
import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

const mailgun_key = process.env.MAILGUN_KEY;
const domain = process.env.MAIL_DOMAIN;
const sender = process.env.MAIL_SENDER;

router.get('/confirm/:email/:userId', auth, (req, res) => {
  var mailgun = new Mailgun({apiKey: mailgun_key, domain: domain});

  var data = {
    from: `Learnimus <${sender}>`,
    to: req.params.email,
    subject: 'Please confirm email with Learnimus',
    html: `<h3>Welcome to the Learnimus Community!</h3> test <a href="http://localhost:3000/#/confirm/${req.params.userId}" target="_blank">Please confirm that this is your email address.</a>`
  };

  mailgun.messages().send(data, function(err, body) {
    if(err) {
      console.log("error: ", err);
      res.status(500).json(err);
    } else {
      res.json(body);
    }
  });
})

export default router;

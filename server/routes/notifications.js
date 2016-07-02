import express from 'express';
var Mailgun = require('mailgun-js');
const router = express.Router();
import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = process.env.PASSWORD;

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

const mailgun_key = process.env.MAILGUN_KEY;
const domain = process.env.MAIL_DOMAIN;
const sender = process.env.MAIL_SENDER;

router.get('/reset/:email', (req, res) => {

  var mailgun = new Mailgun({apiKey: mailgun_key, domain: domain});

  const encryptedEmail = encrypt(req.params.email);

  var data = {
    from: `Learnimus <${sender}>`,
    to: req.params.email,
    subject: 'Password Reset',
    html: `<h5>Have you requested to reset your password?</h5> <a href="http://52.37.27.5/#/reset/${encryptedEmail}" target="_blank">Click to confirm</a> <br><br><br> <h5>Otherwise, ignore this email</h5>`
  };

  mailgun.messages().send(data, function(err, body) {
    if(err) {
      console.log("error: ", err);
      res.status(500).json(err);
    } else {
      res.json({message: 'Confirmation to reset password sent'});
    }
  });
})

router.get('/confirm/:email/:userId', auth, (req, res) => {
  var mailgun = new Mailgun({apiKey: mailgun_key, domain: domain});

  var data = {
    from: `Learnimus <${sender}>`,
    to: req.params.email,
    subject: 'Please confirm your email address',
    html: `<h3>Welcome to the Learnimus Community!</h3> <a href="http://52.37.27.5/#/confirm/${req.params.userId}" target="_blank">Please confirm that this is your email address.</a> <br><br><br><br> <a href="#" target="_blank">"I didn't register my email with Learnimus"</a>`
  };

  mailgun.messages().send(data, function(err, body) {
    if(err) {
      console.log("error: ", err);
      res.status(500).json(err);
    } else {
      res.json({message: 'Verification sent to your address'});
    }
  });
})

export default router;

import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const BreadCrumb = mongoose.model('BreadCrumb');
const Message = mongoose.model('Message');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/', auth, (req, res) => {
  const message = new Message(req.body);
  message.save((err, message) => {
    if (err) return res.sendStatus(500);
    Breadcrumb.findById(message.breadcrumb, (err, breadcrumb) => {
      if (err) return res.sendStatus(404);
      breadcrumb.messages.push(message._id);
      breadcrumb.save((err) => {
        if (err) return res.sendStatus(500);
        res.json(message);
      });
    });
  });
});

export default router;

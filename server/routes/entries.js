import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Entry = mongoose.model('Entry');
const User = mongoose.model('User');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.get('/', auth, (req, res) => {
  Entry.find((err, entries) => {
    if (err) return res.sendStatus(404).json(err);
    res.json(entries);
  });
});

router.post('/', auth, (req, res) => {
  const entry = new Entry(req.body);
  entry.save((err, entry) => {
    if (err) return res.sendStatus(500);
    User.findById(entry.user, (err, user) => {
      if (err) return res.sendStatus(404);
      user.entries.push(entry._id);
      user.save((err) => {
        if (err) return res.sendStatus(500);
        res.json(entry);
      });
    });
  });
});

export default router;

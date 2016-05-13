import express from 'express';
const router = express.Router();
import passport from 'passport';
import mongoose from 'mongoose';
const User = mongoose.model('User');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.get('/', auth, (req, res) => {
  User.find((err, users) => {
    if (err) return res.sendStatus(404);
    res.json(users);
  })
});

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  const user = new User;

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.displayName = req.body.displayName;

  user.save((err, user) => {
    if (err) {
      return next(err);
    }
    return res.json({
      username: user.username,
      _id: user._id,
      token: user.generateJWT(),
      study_maps: user.study_maps,
      displayName: user.displayName,
      points: user.points
    })
  });
});

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields.'});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {return next(err)}


    if (user) {
      return res.json({
        username: user.username,
        _id: user._id,
        token: user.generateJWT(),
        study_maps: user.study_maps,
        displayName: user.displayName,
        points: user.points
      });
    } else {
      return res. status(401).json(info);
    }
  })(req, res, next);
});

router.param('userId', (req, res, next, userId) => {
  User.findById(userId).populate('study_maps').exec((err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
});

router.get('/:userId', auth, (req, res) => {
  res.json(req.user);
});

router.put('/:userId', auth, (req, res) => {
  req.user.update({$set: req.body}, (err) => {
    if (err) return res.status(400).json(err);
    res.sendStatus(200);
  })
});

router.delete('/:userId', auth, (req, res) => {
  req.user.remove((err) => {
    if (err) return res.status(400).json(err);
    res.sendStatus(200);
  });
});

export default router;

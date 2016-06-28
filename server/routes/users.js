import express from 'express';
const router = express.Router();
import passport from 'passport';
import mongoose from 'mongoose';
const User = mongoose.model('User');
import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const password = process.env.PASSWORD;

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

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
      token: user.generateTempJWT(),
      study_maps: user.study_maps,
      displayName: user.displayName,
      points: user.points,
      subscribed_subjects: user.subscribed_subjects
    })
  });
});

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields.'});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {return next(err)}

    if(!user.emailConfirmed) {
      return res.status(400).json({message: 'Please first confirm your email address'});
    }
    if (user) {
      return res.json({
        username: user.username,
        _id: user._id,
        token: user.generateJWT(),
        study_maps: user.study_maps,
        displayName: user.displayName,
        points: user.points,
        subscribed_subjects: user.subscribed_subjects
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.param('userId', (req, res, next, userId) => {
  User.findById(userId).populate([
    {
      path: 'study_maps',
      populate: [
      {
        path: 'keywords',
        model: 'Subject'
      },
      {
        path: 'links',
        populate: [
          {
            path: 'breadcrumbs',
            populate: [
              {
                path: 'messages',
                populate: [
                  {
                    path: 'user'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'breadcrumbs',
        populate: [
          {
            path: 'messages',
            populate: [
              {
                path: 'user'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'subscribed_subjects'
  }
  ]).exec((err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
});

router.put('/reset/', (req, res) => {
  const email = decrypt(req.body.username)
  User.findOne({username: email}, (err, user) => {
    if(err) return res.sendStatus(404);
    user.setPassword(req.body.password);
    user.save((err, user) => {
      if(err) return res.status(500).json(err);
      res.json(user);
    })
  })
})

router.get('/:userId', auth, (req, res) => {
  res.json(req.user);
});

router.put('/:userId', auth, (req, res) => {
  req.user.update({$set: req.body}, (err) => {
    if (err) return res.status(400).json(err);
    res.sendStatus(200);
  })
});

router.put('/confirm/:userId', (req, res) => {
  req.user.emailConfirmed = true;
  req.user.save((err, user) => {
    if (err) return res.status(400).json(err);
    res.json(user);
  })
});

router.put('/subscribe/:userId', auth, (req, res) => {
  req.user.subscribed_subjects = req.body.subscribed_subjects;
  req.user.save((err, user) => {
    if (err) return res.status(400).json(err);
    user.populate([
      {
        path: 'subscribed_subjects'
      }
    ], (err, user) => {
      res.json(user.subscribed_subjects);
    });
  });
});

router.put('/empty_subscribe/:userId', auth, (req, res) => {
  req.user.subscribed_subjects = [];
  req.user.save((err, user) => {
    if (err) return res.status(400).json(err);
    user.populate([
      {
        path: 'subscribed_subjects'
      }
    ], (err, user) => {
      res.json(user.subscribed_subjects);
    });
  });
});

router.delete('/:userId', auth, (req, res) => {
  req.user.remove((err) => {
    if (err) return res.status(400).json(err);
    res.sendStatus(200);
  });
});

export default router;

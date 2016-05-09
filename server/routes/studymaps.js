import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const StudyMap = mongoose.model('StudyMap');
const User = mongoose.model('User');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/', auth, (req, res) => {
  const studymap = new StudyMap(req.body);
  studymap.save((err, studymap) => {
    if (err) return res.sendStatus(500);
    User.findById(studymap.user, (err, user) => {
      if (err) return res.sendStatus(404);
      user.study_maps.push(studymap._id);
      user.save((err) => {
        if (err) return res.sendStatus(500);
        res.json(studymap);
      });
    });
  });
});

router.param('studymapId', (req, res, next, studymapId) => {
  StudyMap.findById(studymapId).populate(
    {path: 'breadcrumbs', populate: { path: 'messages' }}
  ).exec( (err, studymap) => {
    if (err) return res.sendStatus(404);
    req.studymap = studymap;
    next();
  });
});

router.get('/:studymapId', auth, (req, res) => {
  res.json(req.studymap);
});

router.put('/:studymapId', auth, (req, res) => {
  req.studymap.update({$set: req.body}, (err) => {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
  });
});

export default router;

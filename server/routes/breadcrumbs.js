import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const StudyMap = mongoose.model('StudyMap');
const User = mongoose.model('User');
const Breadcrumb = mongoose.model('Breadcrumb');
const Link = mongoose.model('Link');
const Echo = mongoose.model('Echo');
import {store} from '../index';
import {postEcho} from '../state/action_creators';

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/studymap', auth, (req, res) => {
  const breadcrumb = new Breadcrumb(req.body);
  breadcrumb.save((err, breadcrumb) => {
    if (err) return res.sendStatus(500);
    StudyMap.findById(breadcrumb.study_map, (err, studymap) => {
      if (err) return res.sendStatus(404);
      studymap.breadcrumbs.push(breadcrumb._id);
      studymap.save((err, studymap) => {
        if (err) return res.sendStatus(500);
        var echo = new Echo();
        echo.user = breadcrumb.user;
        echo.breadcrumb = breadcrumb._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([{path: 'breadcrumb', populate: {path: 'study_map'}}, {path: 'user'}], (err, echo) => {
            store.dispatch(postEcho(echo));
          });
          res.json(breadcrumb);
        });
      });
    });
  });
});

router.post('/link', auth, (req, res) => {
  const breadcrumb = new Breadcrumb(req.body);
  breadcrumb.save((err, breadcrumb) => {
    if (err) return res.sendStatus(500);
    Link.findById(breadcrumb.link, (err, link) => {
      if (err) return res.sendStatus(404);
      link.breadcrumbs.push(breadcrumb._id);
      link.save((err) => {
        if (err) return res.sendStatus(500);
        var echo = new Echo();
        echo.user = breadcrumb.user;
        echo.breadcrumb = breadcrumb._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([{path: 'breadcrumb', populate: {path: 'study_map'}}, {path: 'user'}], (err, echo) => {
            store.dispatch(postEcho(echo));
          });
          res.json(breadcrumb);
        });
      });
    });
  });
});

router.param('breadcrumbId', (req, res, next, breadcrumbId) => {
  StudyMap.findById(breadcrumbId, (err, breadcrumb) => {
    if (err) return res.sendStatus(404);
    req.breadcrumb = breadcrumb;
    next();
  });
});

router.put('/:breadcrumbId', auth, (req, res) => {
  res.breadcrumb.update({$set: req.body}, (err) => {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
  });
});

export default router;

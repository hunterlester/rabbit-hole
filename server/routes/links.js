import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const StudyMap = mongoose.model('StudyMap');
const Link = mongoose.model('Link');
const Echo = mongoose.model('Echo');
import {store} from '../index';
import {postEcho} from '../state/action_creators';

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/studymap', auth, (req, res) => {
  const link = new Link(req.body);
  link.save((err, link) => {
    if (err) return res.sendStatus(500);
    StudyMap.findById(link.study_map, (err, studymap) => {
      if (err) return res.sendStatus(404);
      studymap.links.push(link._id);
      studymap.save((err) => {
        if (err) return res.sendStatus(500);
        var echo = new Echo();
        echo.user = link.user;
        echo.link = link._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([
            {
              path: 'link',
              populate: [
                {
                  path: 'study_map',
                  populate: [
                    {
                      path: 'keywords'
                    }
                  ]
                }
            ]
            },
            {path: 'user'}], (err, echo) => {
            store.dispatch(postEcho(echo));
          });
          res.json(link);
        });
      });
    });
  });
});

router.param('linkId', (req, res, next, linkId) => {
  Link.findById(linkId, (err, link) => {
    if (err) return res.sendStatus(404);
    req.link = link;
    next();
  });
});

router.post('/:linkId/linktolink', auth, (req, res) => {
  const sublink = new Link(req.body);
  sublink.save((err, sublink) => {
    if (err) return res.sendStatus(500);
    req.link.links.push(sublink._id);
    req.link.save((err) => {
      if (err) res.status(500).json(err);
      res.json(sublink);
    });
  });
});

router.put('/:linkId', auth, (req, res) => {
  req.link.update({$set: req.body}, (err) => {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
  });
});

export default router;

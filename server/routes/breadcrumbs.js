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
    if (err) return res.status(500).json(err);
    StudyMap.findById(breadcrumb.study_map, (err, studymap) => {
      if (err) return res.sendStatus(404);
      studymap.breadcrumbs.push(breadcrumb._id);
      studymap.save((err, studymap) => {
        if (err) return res.status(500).json(err);
        var echo = new Echo();
        echo.user = breadcrumb.user;
        echo.breadcrumb = breadcrumb._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([
            {
              path: 'breadcrumb',
              populate: [
                {
                  path: 'study_map',
                  populate: [
                    {
                      path: 'keywords',
                      model: 'Subject'
                    }
                  ]
                },
                {
                  path: 'messages',
                  model: 'Message'
                }
              ]
          },
          {
            path: 'user'
          }
        ], (err, echo) => {
          if (err) return res.status(500).json(err);
          const echoUserID = echo.breadcrumb.study_map.user;
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
    if (err) return res.status(500).json(err);
    Link.findById(breadcrumb.link, (err, link) => {
      if (err) return res.sendStatus(404);
      link.breadcrumbs.push(breadcrumb._id);
      link.save((err) => {
        if (err) return res.status(500).json(err);
        var echo = new Echo();
        echo.user = breadcrumb.user;
        echo.breadcrumb = breadcrumb._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([
            {
              path: 'breadcrumb',
              populate: [
                {
                  path: 'study_map',
                  populate: [
                    {
                      path: 'keywords',
                      model: 'Subject'
                    },
                    {
                      path: 'messages',
                      model: 'Message'
                    }
                  ]
                }
              ]
            },
            {path: 'user'}], (err, echo) => {
              store.dispatch(postEcho(echo));
          });
          res.json(breadcrumb);
        });
      });
    });
  });
});

router.param('breadcrumbId', (req, res, next, breadcrumbId) => {
  Breadcrumb.findById(breadcrumbId, (err, breadcrumb) => {
    if (err) return res.sendStatus(404);
    req.breadcrumb = breadcrumb;
    next();
  });
});

router.put('/seen/:breadcrumbId', auth, (req, res) => {
  req.breadcrumb.seen = true;
  req.breadcrumb.save((err, data) => {
      if (err) return res.status(400).json(err);
      res.json(data);
  });
});

export default router;

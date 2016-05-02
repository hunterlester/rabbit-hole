import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const StudyMap = mongoose.model('StudyMap');
const User = mongoose.model('User');
const BreadCrumb = mongoose.model('BreadCrumb');
const Link = mongoose.model('Link');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/studymap', auth, (req, res) => {
  const breadcrumb = new BreadCrumb(req.body);
  breadcrumb.save((err, breadcrumb) => {
    if (err) return res.sendStatus(500);
    StudyMap.findById(breadcrumb.study_map, (err, studymap) => {
      if (err) return res.sendStatus(404);
      studymap.breadcrumbs.push(breadcrumb._id);
      studymap.save((err) => {
        if (err) return res.sendStatus(500);
        res.json(breadcrumb);
      });
    });
  });
});

router.post('/link', auth, (req, res) => {
  const breadcrumb = new BreadCrumb(req.body);
  breadcrumb.save((err, breadcrumb) => {
    if (err) return res.sendStatus(500);
    Link.findById(breadcrumb.link, (err, link) => {
      if (err) return res.sendStatus(404);
      link.breadcrumbs.push(breadcrumb._id);
      link.save((err) => {
        if (err) return res.sendStatus(500);
        res.json(breadcrumb);
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

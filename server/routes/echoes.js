import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Echo = mongoose.model('Echo');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.get('/', (req, res) => {
  Echo.find().populate([
    {
      path: 'studymap',
      populate: [
        {
          path: 'keywords',
          model: 'Subject'
        }
      ]
    },
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
        }
      ]
    },
    {
      path: 'link',
      populate: [
        {
          path: 'study_map',
          populate: [
            {
              path: 'keywords',
              model: 'Subject'
            }
          ]
        }
      ]
    },
    {
      path: 'message',
      populate: [
        {
          path: 'breadcrumb'
        },
        {
          path: 'study_map',
          populate: [
            {
              path: 'keywords',
              model: 'Subject'
            }
          ]
        }
      ]
    },
    {path: 'user'}]).exec((err, echoes) => {
    if (err) return res.status(404).json(err);
    res.json(echoes);
  });
});

export default router;

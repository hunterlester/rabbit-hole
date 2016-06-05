import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Breadcrumb = mongoose.model('Breadcrumb');
const Message = mongoose.model('Message');
const Echo = mongoose.model('Echo');
import {store} from '../index';
import {postEcho} from '../state/action_creators';

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
        var echo = new Echo();
        echo.user = message.user;
        echo.message = message._id;
        echo.save((err, echo) => {
          if (err) return res.status(500).json(err);
          echo.populate([
            {
              path: 'message',
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
                path: 'breadcrumb'
              }
            ]
            },
            {
              path: 'user'
            }
          ], (err, echo) => {
            store.dispatch(postEcho(echo));
          });
          res.json(message);
        });
      });
    });
  });
});

export default router;

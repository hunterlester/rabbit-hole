import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Breadcrumb = mongoose.model('Breadcrumb');
const Message = mongoose.model('Message');
const Echo = mongoose.model('Echo');
const User = mongoose.model('User');
import {store} from '../index';
import {postEcho} from '../state/action_creators';

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.post('/', auth, (req, res) => {
  const message = new Message(req.body);
  message.save((err, message) => {
    if (err) return res.status(500).json(err);
    message.populate(
      [
        {
          path: 'user'
        }
      ], (err, message) => {
        res.json(message);
        Breadcrumb.findById(message.breadcrumb, (err, breadcrumb) => {
          if (err) return res.sendStatus(404);
          breadcrumb.messages.push(message._id);
          breadcrumb.save((err) => {
            if (err) return res.sendStatus(500);
            var echo = new Echo();
            echo.user = message.user._id;
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
                    path: 'breadcrumb',
                    populate: [
                      {
                        path: 'messages',
                        model: 'Message'
                      }
                    ]
                  }
                ]
                },
                {
                  path: 'user'
                }
              ], (err, echo) => {
                const echoUserID = echo.message.study_map.user;
                  if(echoUserID.toString() != echo.user._id.toString()) {
                    User.findById(echoUserID, (err, user) => {
                      if(err) return res.sendStatus(404);
                      user.notifications.push(echo._id);
                      user.save((err, user) => {
                        if(err) return res.sendStatus(500);
                      });
                    });
                  }
                store.dispatch(postEcho(echo));
              });
            });
          });
        })
      }
    );
  });
});

export default router;

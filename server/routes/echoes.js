import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Echo = mongoose.model('Echo');

import jwt from 'express-jwt';
const auth = jwt({secret: process.env.JWT_TOKEN, userProperty: 'payload'});

router.get('/', (req, res) => {
  Echo.find().populate('studymap breadcrumb link message').exec((err, echoes) => {
    if (err) return res.status(404).json(err);
    res.json(echoes);
  });
});

export default router;

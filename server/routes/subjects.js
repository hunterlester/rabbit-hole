import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Subject = mongoose.model('Subject');

router.get('/', (req, res) => {
  Subject.find((err, subjects) => {
    if (err) return res.sendStatus(404);
    res.json(subjects);
  })
});

router.post('/', (req, res) => {
  var subject = new Subject(req.body);
  subject.save((err, subject) => {
    if(err) return res.sendStatus(500);
    res.json(subject);
  })
});

export default router;

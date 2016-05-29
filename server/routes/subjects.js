import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const Subject = mongoose.model('Subject');

router.get('/', (req, res) => {
  Subject.find((err, subjects) => {
    if (err) return res.sendStatus(404);
    res.json(subjects);
  })
})

export default router;

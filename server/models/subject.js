import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
  keyword: {type: String, lowercase: true, unique: true, trim: true},
  summary: String,
  count: {type: Number, default: 1}
});

mongoose.model('Subject', SubjectSchema);

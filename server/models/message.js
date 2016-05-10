import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  link: {type: mongoose.Schema.Types.ObjectId, ref: 'Link'},
  study_map: {type: mongoose.Schema.Types.ObjectId, ref: 'StudyMap'},
  breadcrumb: {type: mongoose.Schema.Types.ObjectId, ref: 'Breadcrumb'},
  body: String,
  upvote: Number
});

mongoose.model('Message', MessageSchema);

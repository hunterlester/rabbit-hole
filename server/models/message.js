import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  breadcrumb: {type: mongoose.Schema.Types.ObjectId, ref: 'BreadCrumb'},
  body: String,
  upvote: Number
});

mongoose.model('Message', MessageSchema);

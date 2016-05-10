import mongoose from 'mongoose';

const EchoSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  studymap: {type: mongoose.Schema.Types.ObjectId, ref: 'StudyMap'},
  breadcrumb: {type: mongoose.Schema.Types.ObjectId, ref: 'Breadcrumb'},
  link: {type: mongoose.Schema.Types.ObjectId, ref: 'Link'},
  message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
}, {strict: false});

mongoose.model('Echo', EchoSchema);

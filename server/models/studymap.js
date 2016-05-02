import mongoose from 'mongoose';

const StudyMapSchema = new mongoose.Schema({
  subject: String,
  keywords: [],
  date: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  breadcrumbs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Breadcrumb'}],
  links: [{type: mongoose.Schema.Types.ObjectId, ref: 'Link'}]
}, {strict: false});

mongoose.model('StudyMap', StudyMapSchema);

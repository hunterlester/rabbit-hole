import mongoose from 'mongoose';

const BreadcrumbSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  link: {type: mongoose.Schema.Types.ObjectId, ref: 'Link'},
  study_map: {type: mongoose.Schema.Types.ObjectId, ref: 'StudyMap'},
  content: String,
  keywords: [],
  date: {type: Date, default: Date.now}
}, {strict: false});

mongoose.model('Breadcrumb', BreadcrumbSchema);

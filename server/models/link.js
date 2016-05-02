import mongooose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  title: String,
  uri: String,
  study_map: {type: mongoose.Schema.Types.ObjectId, ref: 'StudyMap'},
  breadcrumbs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Breadcrumb'}],
  links: [{type: mongoose.Schema.Types.ObjectId, ref: 'Link'}],
  upvote: Number
}, {strict: false});

mongoose.model('Link', LinkSchema);

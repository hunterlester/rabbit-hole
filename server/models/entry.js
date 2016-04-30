import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  times_baby_awake: Number,
  completely_awake: Boolean,
  foods_drinks_consumed: [],
  supplements: [],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Entry', EntrySchema);

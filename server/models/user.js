import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  provider: String,
  id: String,
  displayName: {type: String, lowercase: true, unique: true, trim: true},
  name: {
    familyName: String,
    givenName: String,
    middleName: String
  },
  username: {type: String, lowercase: true, unique: true, trim: true},
  emailConfirmed: {type: Boolean, default: false},
  salt: String,
  hash: String,
  subscribed_subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],
  watching: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  breadcrumbs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Breadcrumbs'}],
  study_maps: [{type: mongoose.Schema.Types.ObjectId, ref: 'StudyMap'}],
  notifications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Echo'}],
  points: {type: Number, default: 1}
}, {strict: false});

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.generateTempJWT = function () {
  const today = new Date;
  const exp = new Date(today);
  exp.setHours(today.getHours() + 1);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.JWT_TOKEN);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date;
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.JWT_TOKEN);
};

mongoose.model('User', UserSchema);

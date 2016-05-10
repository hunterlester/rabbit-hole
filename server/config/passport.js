import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import mongoose from 'mongoose';
const User = mongoose.model('User');
const StudyMap = mongoose.model('StudyMap');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}).populate(
      {path: 'study_maps', populate: [
        {
          path: 'links',
          populate: {
            path: 'breadcrumbs',
            populate: {
              path: 'messages',
              populate: {
                path:
                  'user'
                }}}
        },
        {
          path: 'breadcrumbs',
          populate: {
            path: 'messages',
            populate: {
              path: 'user'
            }}}]
      }
    ).exec(
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Incorrect username'});
        }
        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      }
    );
  }
));

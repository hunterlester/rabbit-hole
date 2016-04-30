import express from 'express';
const app = express();
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import 'dotenv/config';


// mlab uri
mongoose.connect(process.env.MONGO_URI);

// Docker Machine host ip
// mongoose.connect('mongodb://192.168.99.100:27017/data/db');

// network bridge
// mongoose.connect('mongodb://172.18.0.2:27017/data/db');


// DATA MODELS
//
//
import './models/entry';
import './models/user';

// PASSPORT CONFIGURATION
//
//
import './config/passport';

// API ROUTES
//
//
import routes from './routes/index';
import users from './routes/users';
import entries from './routes/entries';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/entries', entries);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


export default app;

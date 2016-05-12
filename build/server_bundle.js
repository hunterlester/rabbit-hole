require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.store = undefined;
	
	var _app = __webpack_require__(2);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _http = __webpack_require__(32);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _debug = __webpack_require__(33);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _store = __webpack_require__(34);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _socket = __webpack_require__(40);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var debug = (0, _debug2.default)('rabbit-hole:server');
	
	var Echo = _mongoose2.default.model('Echo');
	
	var port = normalizePort(process.env.PORT || '3000');
	
	_app2.default.set('port', port);
	
	var store = exports.store = (0, _store2.default)();
	
	var server = _http2.default.createServer(_app2.default);
	
	function startSocketServer(store) {
	  var io = new _socket2.default().attach(3001);
	
	  store.subscribe(function () {
	    return io.emit('state', store.getState().toJS());
	  });
	
	  io.on('connection', function (socket) {
	    socket.emit('state', store.getState().toJS());
	    socket.on('action', store.dispatch.bind(store));
	  });
	}
	
	startSocketServer(store);
	
	var promise = new Promise(function (fulfill, reject) {
	  fulfill(Echo.find().populate('studymap breadcrumb link message user').exec(function (err, echoes) {
	    if (err) throw error;
	    return echoes;
	  }));
	});
	
	promise.then(function (res) {
	
	  store.dispatch({
	    type: 'SET_ECHOES',
	    echoes: res
	  });
	});
	
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
	
	function normalizePort(val) {
	  var port = parseInt(val, 10);
	
	  if (isNaN(port)) {
	    return val;
	  }
	
	  if (port >= 0) {
	    return port;
	  }
	
	  return false;
	}
	
	function onError(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }
	
	  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	
	  switch (error.code) {
	    case 'EACCES':
	      console.error(bind + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error(bind + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	}
	
	function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	  debug('Listening on ' + bind);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _serveFavicon = __webpack_require__(5);
	
	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);
	
	var _bodyParser = __webpack_require__(6);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _passport = __webpack_require__(8);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _dotenv = __webpack_require__(9);
	
	var _dotenv2 = _interopRequireDefault(_dotenv);
	
	__webpack_require__(10);
	
	__webpack_require__(13);
	
	__webpack_require__(16);
	
	__webpack_require__(17);
	
	__webpack_require__(18);
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	var _index = __webpack_require__(23);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _users = __webpack_require__(24);
	
	var _users2 = _interopRequireDefault(_users);
	
	var _studymaps = __webpack_require__(26);
	
	var _studymaps2 = _interopRequireDefault(_studymaps);
	
	var _messages = __webpack_require__(28);
	
	var _messages2 = _interopRequireDefault(_messages);
	
	var _links = __webpack_require__(29);
	
	var _links2 = _interopRequireDefault(_links);
	
	var _breadcrumbs = __webpack_require__(30);
	
	var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);
	
	var _echoes = __webpack_require__(31);
	
	var _echoes2 = _interopRequireDefault(_echoes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _express2.default)();
	
	
	// mlab uri
	_mongoose2.default.connect(process.env.MONGO_URI);
	
	// Docker Machine host ip
	// mongoose.connect('mongodb://192.168.99.100:27017/data/db');
	
	// network bridge
	// mongoose.connect('mongodb://172.18.0.2:27017/data/db');
	
	// DATA MODELS
	//
	//
	
	
	// PASSPORT CONFIGURATION
	//
	//
	
	
	// API ROUTES
	//
	//
	
	
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
	app.use(_passport2.default.initialize());
	
	app.use('/', _index2.default);
	app.use('/studymaps', _studymaps2.default);
	app.use('/users', _users2.default);
	app.use('/messages', _messages2.default);
	app.use('/links', _links2.default);
	app.use('/breadcrumbs', _breadcrumbs2.default);
	app.use('/echoes', _echoes2.default);
	
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	// error handlers
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  console.log(err);
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var options = {}
	  process.argv.forEach(function (val, idx, arr) {
	    var matches = val.match(/^dotenv_config_(.+)=(.+)/)
	    if (matches) {
	      options[matches[1]] = matches[2]
	    }
	  })
	
	  __webpack_require__(11).config(options)
	})()


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var fs = __webpack_require__(12)
	
	module.exports = {
	  /*
	   * Main entry point into dotenv. Allows configuration before loading .env
	   * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
	   * @returns {Boolean}
	  */
	  config: function (options) {
	    var path = '.env'
	    var encoding = 'utf8'
	    var silent = false
	
	    if (options) {
	      if (options.silent) {
	        silent = options.silent
	      }
	      if (options.path) {
	        path = options.path
	      }
	      if (options.encoding) {
	        encoding = options.encoding
	      }
	    }
	
	    try {
	      // specifying an encoding returns a string instead of a buffer
	      var parsedObj = this.parse(fs.readFileSync(path, { encoding: encoding }))
	
	      Object.keys(parsedObj).forEach(function (key) {
	        process.env[key] = process.env[key] || parsedObj[key]
	      })
	
	      return parsedObj
	    } catch (e) {
	      if (!silent) {
	        console.error(e)
	      }
	      return false
	    }
	  },
	
	  /*
	   * Parses a string or buffer into an object
	   * @param {String|Buffer} src - source to be parsed
	   * @returns {Object}
	  */
	  parse: function (src) {
	    var obj = {}
	
	    // convert Buffers before splitting into lines and processing
	    src.toString().split('\n').forEach(function (line) {
	      // matching "KEY' and 'VAL' in 'KEY=VAL'
	      var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
	      // matched?
	      if (keyValueArr != null) {
	        var key = keyValueArr[1]
	
	        // default undefined or missing values to empty string
	        var value = keyValueArr[2] ? keyValueArr[2] : ''
	
	        // expand newlines in quoted values
	        var len = value ? value.length : 0
	        if (len > 0 && value.charAt(0) === '\"' && value.charAt(len - 1) === '\"') {
	          value = value.replace(/\\n/gm, '\n')
	        }
	
	        // remove any surrounding quotes and extra spaces
	        value = value.replace(/(^['"]|['"]$)/g, '').trim()
	
	        obj[key] = value
	      }
	    })
	
	    return obj
	  }
	
	}
	
	module.exports.load = module.exports.config


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _crypto = __webpack_require__(14);
	
	var _crypto2 = _interopRequireDefault(_crypto);
	
	var _jsonwebtoken = __webpack_require__(15);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UserSchema = new _mongoose2.default.Schema({
	  date: { type: Date, default: Date.now },
	  provider: String,
	  id: String,
	  displayName: String,
	  name: {
	    familyName: String,
	    givenName: String,
	    middleName: String
	  },
	  username: String,
	  salt: String,
	  hash: String,
	  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumbs' }],
	  study_maps: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' }],
	  points: Number
	}, { strict: false });
	
	UserSchema.methods.validPassword = function (password) {
	  var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	
	  return this.hash === hash;
	};
	
	UserSchema.methods.setPassword = function (password) {
	  this.salt = _crypto2.default.randomBytes(16).toString('hex');
	  this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	};
	
	UserSchema.methods.generateJWT = function () {
	  var today = new Date();
	  var exp = new Date(today);
	  exp.setDate(today.getDate() + 60);
	
	  return _jsonwebtoken2.default.sign({
	    _id: this._id,
	    username: this.username,
	    exp: parseInt(exp.getTime() / 1000)
	  }, process.env.JWT_TOKEN);
	};
	
	_mongoose2.default.model('User', UserSchema);

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StudyMapSchema = new _mongoose2.default.Schema({
	  subject: String,
	  keywords: [],
	  date: { type: Date, default: Date.now },
	  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
	  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' }],
	  links: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' }]
	}, { strict: false });
	
	_mongoose2.default.model('StudyMap', StudyMapSchema);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LinkSchema = new _mongoose2.default.Schema({
	  date: { type: Date, default: Date.now },
	  title: String,
	  uri: String,
	  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
	  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },
	  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' }],
	  links: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' }],
	  upvote: Number
	}, { strict: false });
	
	_mongoose2.default.model('Link', LinkSchema);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BreadcrumbSchema = new _mongoose2.default.Schema({
	  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
	  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },
	  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },
	  content: String,
	  keywords: [],
	  messages: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Message' }],
	  date: { type: Date, default: Date.now },
	  upvote: Number
	}, { strict: false });
	
	_mongoose2.default.model('Breadcrumb', BreadcrumbSchema);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MessageSchema = new _mongoose2.default.Schema({
	  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
	  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },
	  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },
	  breadcrumb: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' },
	  body: String,
	  upvote: Number
	});
	
	_mongoose2.default.model('Message', MessageSchema);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EchoSchema = new _mongoose2.default.Schema({
	  date: { type: Date, default: Date.now },
	  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
	  studymap: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },
	  breadcrumb: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' },
	  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },
	  message: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Message' }
	}, { strict: false });
	
	_mongoose2.default.model('Echo', EchoSchema);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _passport = __webpack_require__(8);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _passportLocal = __webpack_require__(22);
	
	var _passportLocal2 = _interopRequireDefault(_passportLocal);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LocalStrategy = _passportLocal2.default.Strategy;
	
	var User = _mongoose2.default.model('User');
	var StudyMap = _mongoose2.default.model('StudyMap');
	
	_passport2.default.use(new LocalStrategy(function (username, password, done) {
	  User.findOne({ username: username }).populate({ path: 'study_maps', populate: [{
	      path: 'links',
	      populate: {
	        path: 'breadcrumbs',
	        populate: {
	          path: 'messages',
	          populate: {
	            path: 'user'
	          } } }
	    }, {
	      path: 'breadcrumbs',
	      populate: {
	        path: 'messages',
	        populate: {
	          path: 'user'
	        } } }]
	  }).exec(function (err, user) {
	    if (err) {
	      return done(err);
	    }
	    if (!user) {
	      return done(null, false, { message: 'Incorrect username' });
	    }
	    if (!user.validPassword(password)) {
	      return done(null, false, { message: 'Incorrect password' });
	    }
	    return done(null, user);
	  });
	}));

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	router.get('/', function (req, res) {
	  res.render('index');
	});
	
	exports.default = router;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _passport = __webpack_require__(8);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var User = _mongoose2.default.model('User');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.get('/', auth, function (req, res) {
	  User.find(function (err, users) {
	    if (err) return res.sendStatus(404);
	    res.json(users);
	  });
	});
	
	router.post('/register', function (req, res, next) {
	  if (!req.body.username || !req.body.password) {
	    return res.status(400).json({ message: 'Please fill out all fields' });
	  }
	
	  var user = new User();
	
	  user.username = req.body.username;
	  user.setPassword(req.body.password);
	  user.given_name = req.body.given_name;
	  user.surname = req.body.surname;
	
	  user.save(function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    return res.json({
	      username: user.username,
	      _id: user._id,
	      token: user.generateJWT(),
	      study_maps: user.study_maps
	    });
	  });
	});
	
	router.post('/login', function (req, res, next) {
	  if (!req.body.username || !req.body.password) {
	    return res.status(400).json({ message: 'Please fill out all fields.' });
	  }
	
	  _passport2.default.authenticate('local', function (err, user, info) {
	    if (err) {
	      return next(err);
	    }
	
	    if (user) {
	      return res.json({
	        username: user.username,
	        _id: user._id,
	        token: user.generateJWT(),
	        study_maps: user.study_maps
	      });
	    } else {
	      return res.status(401).json(info);
	    }
	  })(req, res, next);
	});
	
	router.param('userId', function (req, res, next, userId) {
	  User.findById(userId).populate('study_maps').exec(function (err, user) {
	    if (err) return res.sendStatus(404);
	    req.user = user;
	    next();
	  });
	});
	
	router.get('/:userId', auth, function (req, res) {
	  res.json(req.user);
	});
	
	router.put('/:userId', auth, function (req, res) {
	  req.user.update({ $set: req.body }, function (err) {
	    if (err) return res.status(400).json(err);
	    res.sendStatus(200);
	  });
	});
	
	router.delete('/:userId', auth, function (req, res) {
	  req.user.remove(function (err) {
	    if (err) return res.status(400).json(err);
	    res.sendStatus(200);
	  });
	});
	
	exports.default = router;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("express-jwt");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _index = __webpack_require__(1);
	
	var _action_creators = __webpack_require__(27);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var StudyMap = _mongoose2.default.model('StudyMap');
	var User = _mongoose2.default.model('User');
	var Echo = _mongoose2.default.model('Echo');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.post('/', auth, function (req, res) {
	  var studymap = new StudyMap(req.body);
	  studymap.save(function (err, studymap) {
	    if (err) return res.sendStatus(500);
	    User.findById(studymap.user, function (err, user) {
	      if (err) return res.sendStatus(404);
	      user.study_maps.push(studymap._id);
	      user.save(function (err) {
	        if (err) return res.sendStatus(500);
	        var echo = new Echo();
	        echo.user = studymap.user;
	        echo.studymap = studymap._id;
	        echo.save(function (err, echo) {
	          if (err) return res.status(500).json(err);
	          echo.populate('studymap user', function (err, echo) {
	            _index.store.dispatch((0, _action_creators.postEcho)(echo));
	          });
	          res.json(studymap);
	        });
	      });
	    });
	  });
	});
	
	router.param('studymapId', function (req, res, next, studymapId) {
	  StudyMap.findById(studymapId).populate({ path: 'breadcrumbs', populate: { path: 'messages' } }).exec(function (err, studymap) {
	    if (err) return res.sendStatus(404);
	    req.studymap = studymap;
	    next();
	  });
	});
	
	router.get('/:studymapId', auth, function (req, res) {
	  res.json(req.studymap);
	});
	
	router.put('/:studymapId', auth, function (req, res) {
	  req.studymap.update({ $set: req.body }, function (err) {
	    if (err) return res.status(400).json(err);
	    res.sendStatus(200);
	  });
	});
	
	exports.default = router;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.postEcho = postEcho;
	function postEcho(echo) {
	  return {
	    type: 'POST_ECHO',
	    echo: echo
	  };
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _index = __webpack_require__(1);
	
	var _action_creators = __webpack_require__(27);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var Breadcrumb = _mongoose2.default.model('Breadcrumb');
	var Message = _mongoose2.default.model('Message');
	var Echo = _mongoose2.default.model('Echo');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.post('/', auth, function (req, res) {
	  var message = new Message(req.body);
	  message.save(function (err, message) {
	    if (err) return res.sendStatus(500);
	    Breadcrumb.findById(message.breadcrumb, function (err, breadcrumb) {
	      if (err) return res.sendStatus(404);
	      breadcrumb.messages.push(message._id);
	      breadcrumb.save(function (err) {
	        if (err) return res.sendStatus(500);
	        var echo = new Echo();
	        echo.user = message.user;
	        echo.message = message._id;
	        echo.save(function (err, echo) {
	          if (err) return res.status(500).json(err);
	          echo.populate([{ path: 'message', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {
	            _index.store.dispatch((0, _action_creators.postEcho)(echo));
	          });
	          res.json(message);
	        });
	      });
	    });
	  });
	});
	
	exports.default = router;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _index = __webpack_require__(1);
	
	var _action_creators = __webpack_require__(27);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var StudyMap = _mongoose2.default.model('StudyMap');
	var Link = _mongoose2.default.model('Link');
	var Echo = _mongoose2.default.model('Echo');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.post('/studymap', auth, function (req, res) {
	  var link = new Link(req.body);
	  link.save(function (err, link) {
	    if (err) return res.sendStatus(500);
	    StudyMap.findById(link.study_map, function (err, studymap) {
	      if (err) return res.sendStatus(404);
	      studymap.links.push(link._id);
	      studymap.save(function (err) {
	        if (err) return res.sendStatus(500);
	        var echo = new Echo();
	        echo.user = link.user;
	        echo.link = link._id;
	        echo.save(function (err, echo) {
	          if (err) return res.status(500).json(err);
	          echo.populate([{ path: 'link', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {
	            _index.store.dispatch((0, _action_creators.postEcho)(echo));
	          });
	          res.json(link);
	        });
	      });
	    });
	  });
	});
	
	router.param('linkId', function (req, res, next, linkId) {
	  Link.findById(linkId, function (err, link) {
	    if (err) return res.sendStatus(404);
	    req.link = link;
	    next();
	  });
	});
	
	router.post('/:linkId/linktolink', auth, function (req, res) {
	  var sublink = new Link(req.body);
	  sublink.save(function (err, sublink) {
	    if (err) return res.sendStatus(500);
	    req.link.links.push(sublink._id);
	    req.link.save(function (err) {
	      if (err) res.status(500).json(err);
	      res.json(sublink);
	    });
	  });
	});
	
	router.put('/:linkId', auth, function (req, res) {
	  req.link.update({ $set: req.body }, function (err) {
	    if (err) return res.status(400).json(err);
	    res.sendStatus(200);
	  });
	});
	
	exports.default = router;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _index = __webpack_require__(1);
	
	var _action_creators = __webpack_require__(27);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var StudyMap = _mongoose2.default.model('StudyMap');
	var User = _mongoose2.default.model('User');
	var Breadcrumb = _mongoose2.default.model('Breadcrumb');
	var Link = _mongoose2.default.model('Link');
	var Echo = _mongoose2.default.model('Echo');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.post('/studymap', auth, function (req, res) {
	  var breadcrumb = new Breadcrumb(req.body);
	  breadcrumb.save(function (err, breadcrumb) {
	    if (err) return res.sendStatus(500);
	    StudyMap.findById(breadcrumb.study_map, function (err, studymap) {
	      if (err) return res.sendStatus(404);
	      studymap.breadcrumbs.push(breadcrumb._id);
	      studymap.save(function (err, studymap) {
	        if (err) return res.sendStatus(500);
	        var echo = new Echo();
	        echo.user = breadcrumb.user;
	        echo.breadcrumb = breadcrumb._id;
	        echo.save(function (err, echo) {
	          if (err) return res.status(500).json(err);
	          echo.populate([{ path: 'breadcrumb', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {
	            _index.store.dispatch((0, _action_creators.postEcho)(echo));
	          });
	          res.json(breadcrumb);
	        });
	      });
	    });
	  });
	});
	
	router.post('/link', auth, function (req, res) {
	  var breadcrumb = new Breadcrumb(req.body);
	  breadcrumb.save(function (err, breadcrumb) {
	    if (err) return res.sendStatus(500);
	    Link.findById(breadcrumb.link, function (err, link) {
	      if (err) return res.sendStatus(404);
	      link.breadcrumbs.push(breadcrumb._id);
	      link.save(function (err) {
	        if (err) return res.sendStatus(500);
	        var echo = new Echo();
	        echo.user = breadcrumb.user;
	        echo.breadcrumb = breadcrumb._id;
	        echo.save(function (err, echo) {
	          if (err) return res.status(500).json(err);
	          echo.populate([{ path: 'breadcrumb', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {
	            _index.store.dispatch((0, _action_creators.postEcho)(echo));
	          });
	          res.json(breadcrumb);
	        });
	      });
	    });
	  });
	});
	
	router.param('breadcrumbId', function (req, res, next, breadcrumbId) {
	  StudyMap.findById(breadcrumbId, function (err, breadcrumb) {
	    if (err) return res.sendStatus(404);
	    req.breadcrumb = breadcrumb;
	    next();
	  });
	});
	
	router.put('/:breadcrumbId', auth, function (req, res) {
	  res.breadcrumb.update({ $set: req.body }, function (err) {
	    if (err) return res.status(400).json(err);
	    res.sendStatus(200);
	  });
	});
	
	exports.default = router;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _mongoose = __webpack_require__(7);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _expressJwt = __webpack_require__(25);
	
	var _expressJwt2 = _interopRequireDefault(_expressJwt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = _express2.default.Router();
	
	var Echo = _mongoose2.default.model('Echo');
	
	var auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });
	
	router.get('/', function (req, res) {
	  Echo.find().populate('studymap breadcrumb link message').exec(function (err, echoes) {
	    if (err) return res.status(404).json(err);
	    res.json(echoes);
	  });
	});
	
	exports.default = router;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = makeStore;
	
	var _redux = __webpack_require__(35);
	
	var _reduxThunk = __webpack_require__(36);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducer = __webpack_require__(37);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeStore() {
	  return (0, _redux.createStore)(_reducer2.default);
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = reducer;
	
	var _core = __webpack_require__(38);
	
	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _core.initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case 'SET_ECHOES':
	      return (0, _core.setEchoes)(state, action.echoes);
	
	    case 'POST_ECHO':
	      return (0, _core.postEcho)(state, action.echo);
	  }
	  return state;
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initialState = undefined;
	exports.setEchoes = setEchoes;
	exports.postEcho = postEcho;
	
	var _immutable = __webpack_require__(39);
	
	var initialState = exports.initialState = (0, _immutable.Map)();
	
	function setEchoes(state, echoes) {
	  return state.set('echoes', (0, _immutable.fromJS)(echoes));
	}
	
	function postEcho(state, echo) {
	  var echoes = state.get('echoes');
	  return state.merge({
	    echoes: echoes.push((0, _immutable.fromJS)(echo))
	  });
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ }
/******/ ]);
//# sourceMappingURL=server_bundle.js.map
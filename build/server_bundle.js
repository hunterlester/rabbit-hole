require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** multi main\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.store = undefined;\n\nvar _app = __webpack_require__(2);\n\nvar _app2 = _interopRequireDefault(_app);\n\nvar _http = __webpack_require__(32);\n\nvar _http2 = _interopRequireDefault(_http);\n\nvar _debug = __webpack_require__(33);\n\nvar _debug2 = _interopRequireDefault(_debug);\n\nvar _store = __webpack_require__(34);\n\nvar _store2 = _interopRequireDefault(_store);\n\nvar _socket = __webpack_require__(40);\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar debug = (0, _debug2.default)('rabbit-hole:server');\n\nvar Echo = _mongoose2.default.model('Echo');\n\nvar port = normalizePort(process.env.PORT || '3000');\n\n_app2.default.set('port', port);\n\nvar store = exports.store = (0, _store2.default)();\n\nvar server = _http2.default.createServer(_app2.default);\n\nfunction startSocketServer(store) {\n  var io = new _socket2.default().attach(3001);\n\n  store.subscribe(function () {\n    return io.emit('state', store.getState().toJS());\n  });\n\n  io.on('connection', function (socket) {\n    socket.emit('state', store.getState().toJS());\n    socket.on('action', store.dispatch.bind(store));\n  });\n}\n\nstartSocketServer(store);\n\nvar promise = new Promise(function (fulfill, reject) {\n  fulfill(Echo.find().populate('studymap breadcrumb link message user').exec(function (err, echoes) {\n    if (err) throw error;\n    return echoes;\n  }));\n});\n\npromise.then(function (res) {\n\n  store.dispatch({\n    type: 'SET_ECHOES',\n    echoes: res\n  });\n});\n\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\n\nfunction normalizePort(val) {\n  var port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    return val;\n  }\n\n  if (port >= 0) {\n    return port;\n  }\n\n  return false;\n}\n\nfunction onError(error) {\n  if (error.syscall !== 'listen') {\n    throw error;\n  }\n\n  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;\n\n  switch (error.code) {\n    case 'EACCES':\n      console.error(bind + ' requires elevated privileges');\n      process.exit(1);\n      break;\n    case 'EADDRINUSE':\n      console.error(bind + ' is already in use');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\nfunction onListening() {\n  var addr = server.address();\n  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;\n  debug('Listening on ' + bind);\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/index.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _path = __webpack_require__(4);\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _serveFavicon = __webpack_require__(5);\n\nvar _serveFavicon2 = _interopRequireDefault(_serveFavicon);\n\nvar _bodyParser = __webpack_require__(6);\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _passport = __webpack_require__(8);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _dotenv = __webpack_require__(9);\n\nvar _dotenv2 = _interopRequireDefault(_dotenv);\n\n__webpack_require__(10);\n\n__webpack_require__(13);\n\n__webpack_require__(16);\n\n__webpack_require__(17);\n\n__webpack_require__(18);\n\n__webpack_require__(19);\n\n__webpack_require__(20);\n\n__webpack_require__(21);\n\nvar _index = __webpack_require__(23);\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _users = __webpack_require__(24);\n\nvar _users2 = _interopRequireDefault(_users);\n\nvar _studymaps = __webpack_require__(26);\n\nvar _studymaps2 = _interopRequireDefault(_studymaps);\n\nvar _messages = __webpack_require__(28);\n\nvar _messages2 = _interopRequireDefault(_messages);\n\nvar _links = __webpack_require__(29);\n\nvar _links2 = _interopRequireDefault(_links);\n\nvar _breadcrumbs = __webpack_require__(30);\n\nvar _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);\n\nvar _echoes = __webpack_require__(31);\n\nvar _echoes2 = _interopRequireDefault(_echoes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = (0, _express2.default)();\n\n\n// mlab uri\n_mongoose2.default.connect(process.env.MONGO_URI);\n\n// Docker Machine host ip\n// mongoose.connect('mongodb://192.168.99.100:27017/data/db');\n\n// network bridge\n// mongoose.connect('mongodb://172.18.0.2:27017/data/db');\n\n// DATA MODELS\n//\n//\n\n\n// PASSPORT CONFIGURATION\n//\n//\n\n\n// API ROUTES\n//\n//\n\n\napp.set('views', _path2.default.join(__dirname, 'views'));\napp.set('view engine', 'ejs');\n\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: false }));\napp.use(_express2.default.static(_path2.default.join(__dirname, 'public')));\napp.use(_passport2.default.initialize());\n\napp.use('/', _index2.default);\napp.use('/studymaps', _studymaps2.default);\napp.use('/users', _users2.default);\napp.use('/messages', _messages2.default);\napp.use('/links', _links2.default);\napp.use('/breadcrumbs', _breadcrumbs2.default);\napp.use('/echoes', _echoes2.default);\n\n// catch 404 and forward to error handler\napp.use(function (req, res, next) {\n  var err = new Error('Not Found');\n  err.status = 404;\n  next(err);\n});\n\n// error handlers\n\n// development error handler\n// will print stacktrace\nif (app.get('env') === 'development') {\n  app.use(function (err, req, res, next) {\n    res.status(err.status || 500);\n    res.render('error', {\n      message: err.message,\n      error: err\n    });\n  });\n}\n\n// production error handler\n// no stacktraces leaked to user\napp.use(function (err, req, res, next) {\n  console.log(err);\n  res.status(err.status || 500);\n  res.render('error', {\n    message: err.message,\n    error: {}\n  });\n});\n\nexports.default = app;\n/* WEBPACK VAR INJECTION */}.call(exports, \"server\"))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/app.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/app.js?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"express\"\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22express%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"path\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"path\"\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22path%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"serve-favicon\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"serve-favicon\"\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22serve-favicon%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = require(\"body-parser\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"body-parser\"\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = require(\"mongoose\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"mongoose\"\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = require(\"passport\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"passport\"\n ** module id = 8\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("module.exports = require(\"dotenv\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"dotenv\"\n ** module id = 9\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("(function () {\n  var options = {}\n  process.argv.forEach(function (val, idx, arr) {\n    var matches = val.match(/^dotenv_config_(.+)=(.+)/)\n    if (matches) {\n      options[matches[1]] = matches[2]\n    }\n  })\n\n  __webpack_require__(11).config(options)\n})()\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/dotenv/config.js\n ** module id = 10\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/dotenv/config.js?");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict'\n\nvar fs = __webpack_require__(12)\n\nmodule.exports = {\n  /*\n   * Main entry point into dotenv. Allows configuration before loading .env\n   * @param {Object} options - valid options: path ('.env'), encoding ('utf8')\n   * @returns {Boolean}\n  */\n  config: function (options) {\n    var path = '.env'\n    var encoding = 'utf8'\n    var silent = false\n\n    if (options) {\n      if (options.silent) {\n        silent = options.silent\n      }\n      if (options.path) {\n        path = options.path\n      }\n      if (options.encoding) {\n        encoding = options.encoding\n      }\n    }\n\n    try {\n      // specifying an encoding returns a string instead of a buffer\n      var parsedObj = this.parse(fs.readFileSync(path, { encoding: encoding }))\n\n      Object.keys(parsedObj).forEach(function (key) {\n        process.env[key] = process.env[key] || parsedObj[key]\n      })\n\n      return parsedObj\n    } catch (e) {\n      if (!silent) {\n        console.error(e)\n      }\n      return false\n    }\n  },\n\n  /*\n   * Parses a string or buffer into an object\n   * @param {String|Buffer} src - source to be parsed\n   * @returns {Object}\n  */\n  parse: function (src) {\n    var obj = {}\n\n    // convert Buffers before splitting into lines and processing\n    src.toString().split('\\n').forEach(function (line) {\n      // matching \"KEY' and 'VAL' in 'KEY=VAL'\n      var keyValueArr = line.match(/^\\s*([\\w\\.\\-]+)\\s*=\\s*(.*)?\\s*$/)\n      // matched?\n      if (keyValueArr != null) {\n        var key = keyValueArr[1]\n\n        // default undefined or missing values to empty string\n        var value = keyValueArr[2] ? keyValueArr[2] : ''\n\n        // expand newlines in quoted values\n        var len = value ? value.length : 0\n        if (len > 0 && value.charAt(0) === '\\\"' && value.charAt(len - 1) === '\\\"') {\n          value = value.replace(/\\\\n/gm, '\\n')\n        }\n\n        // remove any surrounding quotes and extra spaces\n        value = value.replace(/(^['\"]|['\"]$)/g, '').trim()\n\n        obj[key] = value\n      }\n    })\n\n    return obj\n  }\n\n}\n\nmodule.exports.load = module.exports.config\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/dotenv/lib/main.js\n ** module id = 11\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/dotenv/lib/main.js?");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"fs\"\n ** module id = 12\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _crypto = __webpack_require__(14);\n\nvar _crypto2 = _interopRequireDefault(_crypto);\n\nvar _jsonwebtoken = __webpack_require__(15);\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar UserSchema = new _mongoose2.default.Schema({\n  date: { type: Date, default: Date.now },\n  provider: String,\n  id: String,\n  displayName: String,\n  name: {\n    familyName: String,\n    givenName: String,\n    middleName: String\n  },\n  username: String,\n  salt: String,\n  hash: String,\n  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumbs' }],\n  study_maps: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' }],\n  points: { type: Number, default: 1 }\n}, { strict: false });\n\nUserSchema.methods.validPassword = function (password) {\n  var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');\n\n  return this.hash === hash;\n};\n\nUserSchema.methods.setPassword = function (password) {\n  this.salt = _crypto2.default.randomBytes(16).toString('hex');\n  this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');\n};\n\nUserSchema.methods.generateJWT = function () {\n  var today = new Date();\n  var exp = new Date(today);\n  exp.setDate(today.getDate() + 60);\n\n  return _jsonwebtoken2.default.sign({\n    _id: this._id,\n    username: this.username,\n    exp: parseInt(exp.getTime() / 1000)\n  }, process.env.JWT_TOKEN);\n};\n\n_mongoose2.default.model('User', UserSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/user.js\n ** module id = 13\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/user.js?");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("module.exports = require(\"crypto\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"crypto\"\n ** module id = 14\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ },
/* 15 */
/***/ function(module, exports) {

	eval("module.exports = require(\"jsonwebtoken\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"jsonwebtoken\"\n ** module id = 15\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar StudyMapSchema = new _mongoose2.default.Schema({\n  subject: String,\n  keywords: [],\n  date: { type: Date, default: Date.now },\n  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },\n  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' }],\n  links: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' }]\n}, { strict: false });\n\n_mongoose2.default.model('StudyMap', StudyMapSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/studymap.js\n ** module id = 16\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/studymap.js?");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LinkSchema = new _mongoose2.default.Schema({\n  date: { type: Date, default: Date.now },\n  title: String,\n  uri: String,\n  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },\n  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },\n  breadcrumbs: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' }],\n  links: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' }],\n  upvote: Number\n}, { strict: false });\n\n_mongoose2.default.model('Link', LinkSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/link.js\n ** module id = 17\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/link.js?");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar BreadcrumbSchema = new _mongoose2.default.Schema({\n  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },\n  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },\n  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },\n  content: String,\n  keywords: [],\n  messages: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Message' }],\n  date: { type: Date, default: Date.now },\n  upvote: Number\n}, { strict: false });\n\n_mongoose2.default.model('Breadcrumb', BreadcrumbSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/breadcrumb.js\n ** module id = 18\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/breadcrumb.js?");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar MessageSchema = new _mongoose2.default.Schema({\n  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },\n  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },\n  study_map: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },\n  breadcrumb: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' },\n  body: String,\n  upvote: Number\n});\n\n_mongoose2.default.model('Message', MessageSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/message.js\n ** module id = 19\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/message.js?");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar EchoSchema = new _mongoose2.default.Schema({\n  date: { type: Date, default: Date.now },\n  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },\n  studymap: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'StudyMap' },\n  breadcrumb: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Breadcrumb' },\n  link: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Link' },\n  message: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Message' }\n}, { strict: false });\n\n_mongoose2.default.model('Echo', EchoSchema);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/models/echo.js\n ** module id = 20\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/models/echo.js?");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _passport = __webpack_require__(8);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportLocal = __webpack_require__(22);\n\nvar _passportLocal2 = _interopRequireDefault(_passportLocal);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LocalStrategy = _passportLocal2.default.Strategy;\n\nvar User = _mongoose2.default.model('User');\nvar StudyMap = _mongoose2.default.model('StudyMap');\n\n_passport2.default.use(new LocalStrategy(function (username, password, done) {\n  User.findOne({ username: username }).populate({ path: 'study_maps', populate: [{\n      path: 'links',\n      populate: {\n        path: 'breadcrumbs',\n        populate: {\n          path: 'messages',\n          populate: {\n            path: 'user'\n          } } }\n    }, {\n      path: 'breadcrumbs',\n      populate: {\n        path: 'messages',\n        populate: {\n          path: 'user'\n        } } }]\n  }).exec(function (err, user) {\n    if (err) {\n      return done(err);\n    }\n    if (!user) {\n      return done(null, false, { message: 'Incorrect username' });\n    }\n    if (!user.validPassword(password)) {\n      return done(null, false, { message: 'Incorrect password' });\n    }\n    return done(null, user);\n  });\n}));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/config/passport.js\n ** module id = 21\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/config/passport.js?");

/***/ },
/* 22 */
/***/ function(module, exports) {

	eval("module.exports = require(\"passport-local\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"passport-local\"\n ** module id = 22\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nrouter.get('/', function (req, res) {\n  res.render('index');\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/index.js\n ** module id = 23\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/index.js?");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _passport = __webpack_require__(8);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar User = _mongoose2.default.model('User');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.get('/', auth, function (req, res) {\n  User.find(function (err, users) {\n    if (err) return res.sendStatus(404);\n    res.json(users);\n  });\n});\n\nrouter.post('/register', function (req, res, next) {\n  if (!req.body.username || !req.body.password) {\n    return res.status(400).json({ message: 'Please fill out all fields' });\n  }\n\n  var user = new User();\n\n  user.username = req.body.username;\n  user.setPassword(req.body.password);\n  user.displayName = req.body.displayName;\n\n  user.save(function (err, user) {\n    if (err) {\n      return next(err);\n    }\n    return res.json({\n      username: user.username,\n      _id: user._id,\n      token: user.generateJWT(),\n      study_maps: user.study_maps,\n      displayName: user.displayName,\n      points: user.points\n    });\n  });\n});\n\nrouter.post('/login', function (req, res, next) {\n  if (!req.body.username || !req.body.password) {\n    return res.status(400).json({ message: 'Please fill out all fields.' });\n  }\n\n  _passport2.default.authenticate('local', function (err, user, info) {\n    if (err) {\n      return next(err);\n    }\n\n    if (user) {\n      return res.json({\n        username: user.username,\n        _id: user._id,\n        token: user.generateJWT(),\n        study_maps: user.study_maps,\n        displayName: user.displayName,\n        points: user.points\n      });\n    } else {\n      return res.status(401).json(info);\n    }\n  })(req, res, next);\n});\n\nrouter.param('userId', function (req, res, next, userId) {\n  User.findById(userId).populate({ path: 'study_maps', populate: [{\n      path: 'links',\n      populate: {\n        path: 'breadcrumbs',\n        populate: {\n          path: 'messages',\n          populate: {\n            path: 'user'\n          } } }\n    }, {\n      path: 'breadcrumbs',\n      populate: {\n        path: 'messages',\n        populate: {\n          path: 'user'\n        } } }]\n  }).exec(function (err, user) {\n    if (err) return res.sendStatus(404);\n    req.user = user;\n    next();\n  });\n});\n\nrouter.get('/:userId', auth, function (req, res) {\n  res.json(req.user);\n});\n\nrouter.put('/:userId', auth, function (req, res) {\n  req.user.update({ $set: req.body }, function (err) {\n    if (err) return res.status(400).json(err);\n    res.sendStatus(200);\n  });\n});\n\nrouter.delete('/:userId', auth, function (req, res) {\n  req.user.remove(function (err) {\n    if (err) return res.status(400).json(err);\n    res.sendStatus(200);\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/users.js\n ** module id = 24\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/users.js?");

/***/ },
/* 25 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express-jwt\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"express-jwt\"\n ** module id = 25\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22express-jwt%22?");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _index = __webpack_require__(1);\n\nvar _action_creators = __webpack_require__(27);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar StudyMap = _mongoose2.default.model('StudyMap');\nvar User = _mongoose2.default.model('User');\nvar Echo = _mongoose2.default.model('Echo');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.post('/', auth, function (req, res) {\n  var studymap = new StudyMap(req.body);\n  studymap.save(function (err, studymap) {\n    if (err) return res.sendStatus(500);\n    User.findById(studymap.user, function (err, user) {\n      if (err) return res.sendStatus(404);\n      user.study_maps.push(studymap._id);\n      user.save(function (err) {\n        if (err) return res.sendStatus(500);\n        var echo = new Echo();\n        echo.user = studymap.user;\n        echo.studymap = studymap._id;\n        echo.save(function (err, echo) {\n          if (err) return res.status(500).json(err);\n          echo.populate('studymap user', function (err, echo) {\n            _index.store.dispatch((0, _action_creators.postEcho)(echo));\n          });\n          res.json(studymap);\n        });\n      });\n    });\n  });\n});\n\nrouter.param('studymapId', function (req, res, next, studymapId) {\n  StudyMap.findById(studymapId).populate({ path: 'breadcrumbs', populate: { path: 'messages' } }).exec(function (err, studymap) {\n    if (err) return res.sendStatus(404);\n    req.studymap = studymap;\n    next();\n  });\n});\n\nrouter.get('/:studymapId', auth, function (req, res) {\n  res.json(req.studymap);\n});\n\nrouter.put('/:studymapId', auth, function (req, res) {\n  req.studymap.update({ $set: req.body }, function (err) {\n    if (err) return res.status(400).json(err);\n    res.sendStatus(200);\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/studymaps.js\n ** module id = 26\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/studymaps.js?");

/***/ },
/* 27 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.postEcho = postEcho;\nfunction postEcho(echo) {\n  return {\n    type: 'POST_ECHO',\n    echo: echo\n  };\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/state/action_creators.js\n ** module id = 27\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/state/action_creators.js?");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _index = __webpack_require__(1);\n\nvar _action_creators = __webpack_require__(27);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar Breadcrumb = _mongoose2.default.model('Breadcrumb');\nvar Message = _mongoose2.default.model('Message');\nvar Echo = _mongoose2.default.model('Echo');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.post('/', auth, function (req, res) {\n  var message = new Message(req.body);\n  message.save(function (err, message) {\n    if (err) return res.sendStatus(500);\n    Breadcrumb.findById(message.breadcrumb, function (err, breadcrumb) {\n      if (err) return res.sendStatus(404);\n      breadcrumb.messages.push(message._id);\n      breadcrumb.save(function (err) {\n        if (err) return res.sendStatus(500);\n        var echo = new Echo();\n        echo.user = message.user;\n        echo.message = message._id;\n        echo.save(function (err, echo) {\n          if (err) return res.status(500).json(err);\n          echo.populate([{ path: 'message', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {\n            _index.store.dispatch((0, _action_creators.postEcho)(echo));\n          });\n          res.json(message);\n        });\n      });\n    });\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/messages.js\n ** module id = 28\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/messages.js?");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _index = __webpack_require__(1);\n\nvar _action_creators = __webpack_require__(27);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar StudyMap = _mongoose2.default.model('StudyMap');\nvar Link = _mongoose2.default.model('Link');\nvar Echo = _mongoose2.default.model('Echo');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.post('/studymap', auth, function (req, res) {\n  var link = new Link(req.body);\n  link.save(function (err, link) {\n    if (err) return res.sendStatus(500);\n    StudyMap.findById(link.study_map, function (err, studymap) {\n      if (err) return res.sendStatus(404);\n      studymap.links.push(link._id);\n      studymap.save(function (err) {\n        if (err) return res.sendStatus(500);\n        var echo = new Echo();\n        echo.user = link.user;\n        echo.link = link._id;\n        echo.save(function (err, echo) {\n          if (err) return res.status(500).json(err);\n          echo.populate([{ path: 'link', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {\n            _index.store.dispatch((0, _action_creators.postEcho)(echo));\n          });\n          res.json(link);\n        });\n      });\n    });\n  });\n});\n\nrouter.param('linkId', function (req, res, next, linkId) {\n  Link.findById(linkId, function (err, link) {\n    if (err) return res.sendStatus(404);\n    req.link = link;\n    next();\n  });\n});\n\nrouter.post('/:linkId/linktolink', auth, function (req, res) {\n  var sublink = new Link(req.body);\n  sublink.save(function (err, sublink) {\n    if (err) return res.sendStatus(500);\n    req.link.links.push(sublink._id);\n    req.link.save(function (err) {\n      if (err) res.status(500).json(err);\n      res.json(sublink);\n    });\n  });\n});\n\nrouter.put('/:linkId', auth, function (req, res) {\n  req.link.update({ $set: req.body }, function (err) {\n    if (err) return res.status(400).json(err);\n    res.sendStatus(200);\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/links.js\n ** module id = 29\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/links.js?");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _index = __webpack_require__(1);\n\nvar _action_creators = __webpack_require__(27);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar StudyMap = _mongoose2.default.model('StudyMap');\nvar User = _mongoose2.default.model('User');\nvar Breadcrumb = _mongoose2.default.model('Breadcrumb');\nvar Link = _mongoose2.default.model('Link');\nvar Echo = _mongoose2.default.model('Echo');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.post('/studymap', auth, function (req, res) {\n  var breadcrumb = new Breadcrumb(req.body);\n  breadcrumb.save(function (err, breadcrumb) {\n    if (err) return res.sendStatus(500);\n    StudyMap.findById(breadcrumb.study_map, function (err, studymap) {\n      if (err) return res.sendStatus(404);\n      studymap.breadcrumbs.push(breadcrumb._id);\n      studymap.save(function (err, studymap) {\n        if (err) return res.sendStatus(500);\n        var echo = new Echo();\n        echo.user = breadcrumb.user;\n        echo.breadcrumb = breadcrumb._id;\n        echo.save(function (err, echo) {\n          if (err) return res.status(500).json(err);\n          echo.populate([{ path: 'breadcrumb', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {\n            _index.store.dispatch((0, _action_creators.postEcho)(echo));\n          });\n          res.json(breadcrumb);\n        });\n      });\n    });\n  });\n});\n\nrouter.post('/link', auth, function (req, res) {\n  var breadcrumb = new Breadcrumb(req.body);\n  breadcrumb.save(function (err, breadcrumb) {\n    if (err) return res.sendStatus(500);\n    Link.findById(breadcrumb.link, function (err, link) {\n      if (err) return res.sendStatus(404);\n      link.breadcrumbs.push(breadcrumb._id);\n      link.save(function (err) {\n        if (err) return res.sendStatus(500);\n        var echo = new Echo();\n        echo.user = breadcrumb.user;\n        echo.breadcrumb = breadcrumb._id;\n        echo.save(function (err, echo) {\n          if (err) return res.status(500).json(err);\n          echo.populate([{ path: 'breadcrumb', populate: { path: 'study_map' } }, { path: 'user' }], function (err, echo) {\n            _index.store.dispatch((0, _action_creators.postEcho)(echo));\n          });\n          res.json(breadcrumb);\n        });\n      });\n    });\n  });\n});\n\nrouter.param('breadcrumbId', function (req, res, next, breadcrumbId) {\n  StudyMap.findById(breadcrumbId, function (err, breadcrumb) {\n    if (err) return res.sendStatus(404);\n    req.breadcrumb = breadcrumb;\n    next();\n  });\n});\n\nrouter.put('/:breadcrumbId', auth, function (req, res) {\n  res.breadcrumb.update({ $set: req.body }, function (err) {\n    if (err) return res.status(400).json(err);\n    res.sendStatus(200);\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/breadcrumbs.js\n ** module id = 30\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/breadcrumbs.js?");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(3);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _mongoose = __webpack_require__(7);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _expressJwt = __webpack_require__(25);\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nvar Echo = _mongoose2.default.model('Echo');\n\nvar auth = (0, _expressJwt2.default)({ secret: process.env.JWT_TOKEN, userProperty: 'payload' });\n\nrouter.get('/', function (req, res) {\n  Echo.find().populate('studymap breadcrumb link message').exec(function (err, echoes) {\n    if (err) return res.status(404).json(err);\n    res.json(echoes);\n  });\n});\n\nexports.default = router;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/routes/echoes.js\n ** module id = 31\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/routes/echoes.js?");

/***/ },
/* 32 */
/***/ function(module, exports) {

	eval("module.exports = require(\"http\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"http\"\n ** module id = 32\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22http%22?");

/***/ },
/* 33 */
/***/ function(module, exports) {

	eval("module.exports = require(\"debug\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"debug\"\n ** module id = 33\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = makeStore;\n\nvar _redux = __webpack_require__(35);\n\nvar _reduxThunk = __webpack_require__(36);\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reducer = __webpack_require__(37);\n\nvar _reducer2 = _interopRequireDefault(_reducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction makeStore() {\n  return (0, _redux.createStore)(_reducer2.default);\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/state/store.js\n ** module id = 34\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/state/store.js?");

/***/ },
/* 35 */
/***/ function(module, exports) {

	eval("module.exports = require(\"redux\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"redux\"\n ** module id = 35\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ },
/* 36 */
/***/ function(module, exports) {

	eval("module.exports = require(\"redux-thunk\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"redux-thunk\"\n ** module id = 36\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = reducer;\n\nvar _core = __webpack_require__(38);\n\nfunction reducer() {\n  var state = arguments.length <= 0 || arguments[0] === undefined ? _core.initialState : arguments[0];\n  var action = arguments[1];\n\n  switch (action.type) {\n    case 'SET_ECHOES':\n      return (0, _core.setEchoes)(state, action.echoes);\n\n    case 'POST_ECHO':\n      return (0, _core.postEcho)(state, action.echo);\n  }\n  return state;\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/state/reducer.js\n ** module id = 37\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/state/reducer.js?");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initialState = undefined;\nexports.setEchoes = setEchoes;\nexports.postEcho = postEcho;\n\nvar _immutable = __webpack_require__(39);\n\nvar initialState = exports.initialState = (0, _immutable.Map)();\n\nfunction setEchoes(state, echoes) {\n  return state.set('echoes', (0, _immutable.fromJS)(echoes));\n}\n\nfunction postEcho(state, echo) {\n  var echoes = state.get('echoes');\n  return state.merge({\n    echoes: echoes.push((0, _immutable.fromJS)(echo))\n  });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server/state/core.js\n ** module id = 38\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server/state/core.js?");

/***/ },
/* 39 */
/***/ function(module, exports) {

	eval("module.exports = require(\"immutable\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"immutable\"\n ** module id = 39\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22immutable%22?");

/***/ },
/* 40 */
/***/ function(module, exports) {

	eval("module.exports = require(\"socket.io\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"socket.io\"\n ** module id = 40\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }
/******/ ]);
import app from './app';
import http from 'http';
import debugGet from 'debug';
const debug = debugGet('rabbit-hole:server');
import makeStore from './state/store';
import Server from 'socket.io';
import mongoose from 'mongoose';
const Echo = mongoose.model('Echo');
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

let port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

let compiler = webpack(config[1]);
app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: config[1].output.publicPath}))
app.use(webpackHotMiddleware(compiler))

export const store = makeStore();

const server = http.createServer(app);

function startSocketServer(store) {
  const io = new Server().attach(3001);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  })
}

startSocketServer(store);

let promise = new Promise((fulfill, reject) => {
  fulfill(
    Echo.find().populate('studymap breadcrumb link message user').exec((err, echoes) => {
      if (err) throw error
      return echoes;
    })
  );
});

promise.then((res) => {

  store.dispatch({
    type: 'SET_ECHOES',
    echoes: res
  });
})


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

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

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

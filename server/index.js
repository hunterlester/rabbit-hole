import app from './app';
import http from 'http';
import debugGet from 'debug';
const debug = debugGet('rabbit-hole:server');
import makeStore from './state/store';
import Server from 'socket.io';
import mongoose from 'mongoose';
const Echo = mongoose.model('Echo');
const Subject = mongoose.model('Subject');
const User = mongoose.model('User');

let port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

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

let userPromise = new Promise((fulfill, reject) => {
  fulfill(
    User.find().select('displayName username').exec((err, users) => {
      if(err) throw error
      return users;
    })
  )
});

let subjectPromise = new Promise((fulfill, reject) => {
  fulfill(
    Subject.find((err, subjects) => {
      if (err) throw error
      return subjects;
    })
  );
})

let echoPromise = new Promise((fulfill, reject) => {
  fulfill(
    Echo.find().populate(
      [
        {
          path: 'studymap',
          populate: [
            {
              path: 'keywords',
              model: 'Subject'
            }
          ]
        },
        {
          path: 'breadcrumb',
          populate: [
            {
              path: 'study_map',
              populate: [
                {
                  path: 'keywords',
                  model: 'Subject'
                }
              ]
            },
            {
              path: 'messages',
              model: 'Message',
              populate: [
                {
                  path: 'user',
                  model: 'User'
                }
              ]
            }
          ]
        },
        {
          path: 'link',
          populate: [
            {
              path: 'study_map',
              populate: [
                {
                  path: 'keywords',
                  model: 'Subject'
                }
              ]
            }
          ]
        },
        {
          path: 'message',
          populate: [
            {
              path: 'user'
            },
            {
              path: 'breadcrumb',
              populate: [
                {
                  path: 'messages',
                  model: 'Message',
                  populate: [
                    {
                      path: 'user',
                      model: 'User'
                    }
                  ]
                }
              ]
            },
            {
              path: 'study_map',
              populate: [
                {
                  path: 'keywords',
                  model: 'Subject'
                }
              ]
            }
          ]
        },
        {
          path: 'user'
        }
      ]).exec((err, echoes) => {
      if (err) throw error;
      return echoes;
    })
  );
});

echoPromise.then((res) => {
  store.dispatch({
    type: 'SET_ECHOES',
    echoes: res
  });
});

subjectPromise.then(res => {
  store.dispatch({
    type: 'SET_SUBJECTS',
    subjects: res
  });
});

userPromise.then(res => {
  store.dispatch({
    type: 'SET_USERS',
    users: res
  })
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

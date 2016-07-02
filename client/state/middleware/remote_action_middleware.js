export default socket => store => next => action => {
  if(process.env.NODE_ENV == 'development') {
    console.log(action);
  }
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}

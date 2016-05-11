import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import api from './middleware/api';

export default function makeStore() {
  let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

  return createStoreWithMiddleware(reducer);
}

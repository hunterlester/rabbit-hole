import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

export default function makeStore() {
  return createStore(reducer);
}

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './state/reducers';
import thunkMiddleware from 'redux-thunk';
import api from './state/middleware/api';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import App from './components/App';
import {ConnectedRegister} from './components/Register';
import {ConnectedHome} from './components/Home';
import './styles.css';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

const store = createStoreWithMiddleware(reducers);

const routes = <Route component={App}>
  <Route path="/" component={ConnectedHome} />
  <Route path="/register" component={ConnectedRegister} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

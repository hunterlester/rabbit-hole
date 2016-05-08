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
import {ConnectedStudyMapForm} from './components/StudyMapForm';
import {ConnectedEchoes} from './components/Echoes';
import {ConnectedStudyMaps} from './components/StudyMaps';
import {ConnectedSingleStudyMap} from './components/StudyMap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

const store = createStoreWithMiddleware(reducers);

const routes = <Route component={App}>
  <Route component={ConnectedHome}>
    <Route path="/" component={ConnectedStudyMaps} />
    <Route path="/echoes" component={ConnectedEchoes} />
    <Route path="/studymapform" component={ConnectedStudyMapForm} />
    <Route path="/studymaps/:studyMap" component={ConnectedSingleStudyMap} />
  </Route>
  <Route path="/register" component={ConnectedRegister} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

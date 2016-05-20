import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducers from './state/reducers';
import {setEchoes} from './state/echo_action_creators';
import remoteActionMiddleware from './state/middleware/remote_action_middleware';
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
import {ConnectedProfile} from './components/Profile';
import {ConnectedProfileStudyMap} from './components/ProfileStudyMap';
import cleanest from 'cleanest';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

const socket = io(`${location.protocol}//${location.hostname}:3001`);
socket.on('state', state =>
  store.dispatch(setEchoes(cleanest(state)))
);

let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, api, remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducers);

const routes = <Route component={App}>
  <Route component={ConnectedHome}>
    <Route path="/" component={ConnectedStudyMaps} />
    <Route path="/echoes" component={ConnectedEchoes} />
    <Route path="/studymapform" component={ConnectedStudyMapForm} />
    <Route path="/studymaps/:studyMap" component={ConnectedSingleStudyMap} />
    <Route path="/profile/:userID" component={ConnectedProfile} />
    <Route path="/profile/link/:studyMap/:link/:breadcrumb/:message" component={ConnectedProfileStudyMap} />
    <Route path="/profile/study_map/:studyMap/:breadcrumb/:message" component={ConnectedProfileStudyMap} />
    <Route path="/profile/study_map/:studyMap/:link/:breadcrumb" component={ConnectedProfileStudyMap} />
    <Route path="/profile/link/:studyMap/:link" component={ConnectedProfileStudyMap} />
    <Route path="/profile/study_map/:studyMap/:breadcrumb" component={ConnectedProfileStudyMap} />
    <Route path="/profile/study_map/:studyMap" component={ConnectedProfileStudyMap} />
  </Route>
  <Route path="/register" component={ConnectedRegister} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducers from './state/reducers';
import {setEchoes} from './state/echo_action_creators';
import { setSubjects } from './state/subject_actions.js';
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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cleanest from 'cleanest';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import 'react-select/dist/react-select.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { deepOrange500, blueGrey50 } from 'material-ui/styles/colors';


const socket = io(`${location.protocol}//${location.hostname}:3001`);

socket.on('state', state => {
  localStorage.setItem('echoes', JSON.stringify(cleanest(state.echoes)))
  localStorage.setItem('subjects', JSON.stringify(cleanest(state.subjects)))
  store.dispatch(setEchoes(cleanest(state)))
  store.dispatch(setSubjects(cleanest(state)))
}
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

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    primary3Color: deepOrange500,
    accent2Color: blueGrey50,
  }
});
const darkMuiTheme = getMuiTheme(darkBaseTheme);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);

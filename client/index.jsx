import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducers from './state/reducers';
import { setEchoesAction } from './state/reducer_components/echoes/actions';
import { setSubjectsAction } from './state/reducer_components/subjects/actions';
import { setReservedUsers } from './state/reducer_components/auth/user_registration/actions';
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
import About from './components/About';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cleanest from 'cleanest';
import 'react-select/dist/react-select.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { blueGrey900, orange500 } from 'material-ui/styles/colors';


const socket = io(`${location.protocol}//${location.hostname}:3001`);

let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, api, remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducers);

socket.on('state', state => {
  localStorage.setItem('echoes', JSON.stringify(cleanest(state.echoes)))
  localStorage.setItem('subjects', JSON.stringify(cleanest(state.subjects)))
  store.dispatch(setEchoesAction(cleanest(state)))
  store.dispatch(setSubjectsAction(cleanest(state)))
  store.dispatch(setReservedUsers(state))
}
);



const routes = <Route component={App}>
  <Route component={ConnectedHome}>
    <Route path="/" component={ConnectedStudyMaps} />
    <Route path="/about" component={About} />
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
    accent1Color: blueGrey900,
    primary1Color: orange500
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={hashHistory}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);

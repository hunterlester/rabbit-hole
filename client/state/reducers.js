import {Map, List} from 'immutable';
import { combineReducers } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './user_login/login_action_factories';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './user_registration/actions';
import { ENTRIES_POST, ENTRIES_SUCCESS, ENTRIES_FAILURE } from './api/actions';
import { SET_ENTRIES } from './entry_actions';

const initialAuth = Map({
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true: false,
  user: {
    username: localStorage.getItem('username') || null,
    _id: localStorage.getItem('_id') || null,
    token: localStorage.getItem('token') || null
  }
});

function auth(state = initialAuth, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state.merge({
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case REGISTER_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: ''
      });
    case REGISTER_FAILURE:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGIN_REQUEST:
      return state.merge({
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: {
          username: action.user.username,
          _id: action.user._id,
          token: action.user.token
        }
      });
    case LOGIN_FAILURE:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        isFetching: true,
        isAuthenticated: false
      });
  }
  return state;
}

const parsedEntries = JSON.parse(localStorage.getItem('entries'));

const initialEntries = Map({
  isFetching: false,
  entries: parsedEntries || [],
});

function entries(state = initialEntries, action) {
  switch (action.type) {
    case SET_ENTRIES:
      return state.merge({
        isFetching: false,
        entries: action.entries
      });
    case ENTRIES_POST:
      return state.merge({
        entries: state.get('entries').push(Map(JSON.parse(action.response)))
      });
      return state.entries.push(action.response);
    case ENTRIES_SUCCESS:
      return state.merge({
        isFetching: false,
        entries: action.response,
        authenticated: action.authenticated || false
      });
    case ENTRIES_FAILURE:
      return state.merge({
        isFetching: false
      });
  }
  return state;
}

const reducers = combineReducers({
  auth,
  entries
});

export default reducers;

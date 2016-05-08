import {Map, List, fromJS} from 'immutable';
import { combineReducers } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './user_login/login_action_factories';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './user_registration/actions';
import { STUDY_MAPS_POST, STUDY_MAPS_SUCCESS, STUDY_MAPS_FAILURE, LINK_POST } from './api/actions';
import { SET_STUDY_MAPS } from './study_map_actions';

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

const parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));

const initialStudyMaps = fromJS({
  isFetching: false,
  study_maps: parsedStudyMaps || [],
});

function study_maps(state = initialStudyMaps, action) {
  switch (action.type) {
    case SET_STUDY_MAPS:
      return state.merge({
        isFetching: false,
        study_maps: action.study_maps
      });
    case STUDY_MAPS_POST:
      return state.merge({
        study_maps: state.get('study_maps').push(fromJS(JSON.parse(action.response)))
      });
    case STUDY_MAPS_SUCCESS:
      return state.merge({
        isFetching: false,
        study_maps: action.response,
        authenticated: action.authenticated || false
      });
    case STUDY_MAPS_FAILURE:
      return state.merge({
        isFetching: false
      });
    case LINK_POST:
      console.log(state.get('study_maps').toJS());
        return state.merge({
          study_maps: state.get('study_maps').map(study_map => {
            if(JSON.parse(action.response).study_map === study_map.get('_id')) {
              return study_map.set('links',
              study_map.get('links').push(fromJS(JSON.parse(action.response)))
            );
            } else {
              return study_map;
            }
          })
        });
  }
  return state;
}

const reducers = combineReducers({
  auth,
  study_maps
});

export default reducers;

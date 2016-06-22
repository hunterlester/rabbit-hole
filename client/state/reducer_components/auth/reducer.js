import { initialAuth } from './user_login/login_actions_core';

import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  UPDATE_SUBSCRIPTIONS, UPDATE_SUBSCRIPTIONS_REQUEST
} from './user_login/login_action_factories';

import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, SET_RESERVED_USERS
} from './user_registration/actions';

export default function auth(state = initialAuth, action) {
  switch (action.type) {
    case SET_RESERVED_USERS:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        reserved_user_info: action.state.users
      });
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
        user: action.creds,
        errorMessage: ''
      });
    case LOGIN_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: {
          username: action.user.username,
          _id: action.user._id,
          token: action.user.token,
          displayName: action.user.displayName,
          points: action.user.points,
          subscribed_subjects: action.user.subscribed_subjects
        }
      });
    case LOGIN_FAILURE:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_REQUEST:
      return state.merge({
        isFetching: true,
        isAuthenticated: true
      });
    case LOGOUT_SUCCESS:
      return state.merge({
        isFetching: false,
        isAuthenticated: false,
        user: {}
      });
    case UPDATE_SUBSCRIPTIONS:
      return state.setIn(['user', 'subscribed_subjects'], action.subjects).setIn(['isFetching'], false);

    case UPDATE_SUBSCRIPTIONS_REQUEST:
      return state.merge({
        isFetching: true
      })

    case SET_RESERVED_USERS:
      return state.merge
  }
  return state;
}

import { initialAuth } from '../user_login/login_actions_core';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../user_login/login_action_factories';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../user_registration/actions';

export default function auth(state = initialAuth, action) {
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
          token: action.user.token,
          displayName: action.user.displayName,
          points: action.user.points
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
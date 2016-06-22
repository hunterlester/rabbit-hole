export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_RESERVED_USERS = 'SET_RESERVED_USERS';

export function setReservedUsers(state) {
  return {
    type: SET_RESERVED_USERS,
    isFetching: false,
    isAuthenticated: false,
    state
  }
}

export function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

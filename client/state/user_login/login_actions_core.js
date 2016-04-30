import {requestLogin, loginError, receiveLogin, requestLogout, receiveLogout} from './login_action_factories';
import { setEntries } from '../entry_actions';

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds));

    return fetch(`${location.protocol}//${location.hostname}:${location.port}/users/login`, config)
      .then(response =>
        response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          localStorage.setItem('_id', user._id);
          localStorage.setItem('entries', JSON.stringify(user.entries));
          dispatch(receiveLogin(user));
          dispatch(setEntries(user.entries));
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}

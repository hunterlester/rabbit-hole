import {hashHistory} from 'react-router';
import {requestRegister, registerError, receiveRegister} from './actions';
import fetch from 'isomorphic-fetch'

export function registerUser(creds) {

  let body = Object.keys(creds).map(key => {
    return key + '=' + creds[key];
  }).join('&');

  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: body
  };

  return dispatch => {
    dispatch(requestRegister(creds));

    return fetch(`${location.protocol}//${location.hostname}:${location.port}/users/register`, config)
      .then(response =>
        response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          dispatch(registerError(user.message));
          return Promise.reject(user);
        } else {
          dispatch(receiveRegister(user));
          hashHistory.push('/');
        }
      }).catch(err => console.log(err))

  }
}

import {requestLogin, loginError, receiveLogin, requestLogout, receiveLogout} from './login_action_factories';
import { setStudyMaps } from '../study_map_actions';
import {hashHistory} from 'react-router';
import { fromJS } from 'immutable';
import fetch from 'isomorphic-fetch';

export const initialAuth = fromJS({
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true: false,
  user: {
    username: localStorage.getItem('username') || undefined,
    _id: localStorage.getItem('_id') || undefined,
    token: localStorage.getItem('token') || undefined,
    displayName: localStorage.getItem('displayName') || undefined,
    points: localStorage.getItem('points') || undefined
  }
});


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
          localStorage.setItem('displayName', user.displayName);
          localStorage.setItem('_id', user._id);
          localStorage.setItem('study_maps', JSON.stringify(user.study_maps));
          localStorage.setItem('points', user.points);
          dispatch(receiveLogin(user));
          dispatch(setStudyMaps(user.study_maps));
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('_id')
    localStorage.removeItem('study_maps')
    localStorage.removeItem('displayName')
    localStorage.removeItem('points');
    dispatch(receiveLogout())
    hashHistory.push('/');
  }
}

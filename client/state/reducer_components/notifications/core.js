import fetch from 'isomorphic-fetch';
import {hashHistory} from 'react-router';

import {
  requestConfirmation, receiveConfirmation, failureConfirmation,
  requestConfirmationEmail, receiveConfirmationEmail, failureConfirmationEmail
} from './actions';

export function confirmEmail(userID) {
  let config = {
    method: 'PUT'
  };

  return dispatch => {
    dispatch(requestConfirmation(userID));
    return fetch(`${location.protocol}//${location.hostname}:${location.port}/users/confirm/${userID}`, config)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if(!response.ok) {
        dispatch(failureConfirmation(json));
        return Promise.reject(json);
      } else {
        dispatch(receiveConfirmation(json));
        hashHistory.push('/');
      }
    }).catch(err => console.log(err))
  }
}

export function sendConfirmEmail(user) {
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return dispatch => {
    dispatch(requestConfirmationEmail(user));
    return fetch(`${location.protocol}//${location.hostname}:${location.port}/notify/confirm/${user.username}/${user._id}`, config)
    .then(response =>
      response.json().then(msg => ({msg, response}))
    ).then(({msg, response}) => {
      if (!response.ok) {
        dispatch(failureConfirmationEmail(msg))
        return Promise.reject(msg);
      } else {
        dispatch(receiveConfirmationEmail(msg));
      }
    }).catch(err => console.log(err))
  }
}

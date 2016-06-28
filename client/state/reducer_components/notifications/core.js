import fetch from 'isomorphic-fetch';
import {hashHistory} from 'react-router';

import {
  requestConfirmation, receiveConfirmation, failureConfirmation,
  requestConfirmationEmail, receiveConfirmationEmail, failureConfirmationEmail,
  requestResetEmail, receiveResetEmail, failureResetEmail,
  requestReset, receiveReset, failureReset
} from './actions';

export function sendPasswordResetEmail(emailAddress) {
  let config = {
    method: 'GET'
  };

  return dispatch => {
    dispatch(requestResetEmail(emailAddress));
    return fetch(`${location.protocol}//${location.hostname}:${location.port}/notify/reset/${emailAddress}`, config)
    .then(response =>
      response.json().then(msg => ({msg, response}))
    ).then(({msg, response}) => {
      if (!response.ok) {
        dispatch(failureResetEmail(msg));
        return Promise.reject(msg);
      } else {
        dispatch(receiveResetEmail(msg));
      }
    }).catch(err => console.log(err))
  }
}

export function resetPassword(encryptedEmail, newPassword) {
  let config = {
    method: 'PUT',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body: `username=${encryptedEmail}&password=${newPassword}`
  }

  return dispatch => {
    dispatch(requestReset())
    return fetch(`${location.protocol}//${location.hostname}:${location.port}/users/reset/`, config)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if(!response.ok) {
        dispatch(failureReset(json));
        return Promise.reject(json);
      } else {
        dispatch(receiveReset(json))
        hashHistory.push('/');
      }
    }).catch(err => console.log(err))
  }
}

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

import fetch from 'isomorphic-fetch';
import { requestConfirmation, failuerConfirmation, receiveConfirmation } from './actions';

export function confirmEmail(user) {
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return dispatch => {
    dispatch(requestConfirmation(user));
    return fetch(`${location.protocol}//${location.hostname}:${location.port}/notify/confirm/${user.username}`, config)
    .then(response =>
      response.json().then(msg => ({msg, response}))
    ).then(({msg, response}) => {
      if (!response.ok) {
        dispatch(failuerConfirmation(msg))
        return Promise.reject(msg);
      } else {
        dispatch(receiveConfirmation(msg))
      }
    }).catch(err => console.log(err))
  }
}

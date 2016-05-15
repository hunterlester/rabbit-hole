import {receiveProfile} from './action_creators';
import {hashHistory} from 'react-router';
import fetch from 'isomorphic-fetch'

export function getProfile(userID) {
  let token = localStorage.getItem('token') || null;

  let config = {
    method: 'GET',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  }

  return dispatch => {

    return fetch(`${location.protocol}//${location.hostname}:${location.port}/users/${userID}`, config)
      .then(response =>
        response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          return Promise.reject(user);
        } else {
          localStorage.setItem('userObj', JSON.stringify(user));
          localStorage.setItem('user_displayName', user.displayName);
          localStorage.setItem('profile_id', user._id);
          localStorage.setItem('profile_study_maps', JSON.stringify(user.study_maps));
          localStorage.setItem('profile_points', user.points);

          dispatch(receiveProfile(user));
          hashHistory.push(`/profile/${user._id}`);
        }
      }).catch(err => console.log("Error: ", err))
  }
}

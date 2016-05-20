import {receiveProfile} from './action_creators';
import {hashHistory} from 'react-router';
import {Map, fromJS} from 'immutable';
import fetch from 'isomorphic-fetch';
import cleanest from 'cleanest';

export const initialState = fromJS({
  displayName: localStorage.getItem('profile_displayName'),
  _id: localStorage.getItem('profile_id'),
  study_maps: JSON.parse(localStorage.getItem('profile_study_maps')),
  points: localStorage.getItem('profile_points')
});

export function getProfile(userID, uri) {
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
          let cleaned_user = cleanest(user);
          localStorage.setItem('userObj', JSON.stringify(cleaned_user));
          localStorage.setItem('profile_displayName', cleaned_user.displayName);
          localStorage.setItem('profile_id', cleaned_user._id);
          localStorage.setItem('profile_study_maps', JSON.stringify(cleaned_user.study_maps));
          localStorage.setItem('profile_points', cleaned_user.points);

          dispatch(receiveProfile(cleaned_user));

          if(uri) {
            hashHistory.push(uri);
          } else {
            hashHistory.push(`/profile/${cleaned_user._id}`);
          }
        }
      }).catch(err => console.log("Error: ", err))
  }
}

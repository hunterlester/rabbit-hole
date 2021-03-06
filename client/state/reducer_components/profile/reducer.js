import { Map, fromJS } from 'immutable';
import { initialState } from './core';
import { RECEIVE_PROFILE } from './actions';

export default function profile(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      return state.merge({
        displayName: fromJS(action.profile.displayName),
        _id: fromJS(action.profile._id),
        study_maps: fromJS(action.profile.study_maps),
        points: fromJS(action.profile.points),
        profile_subjects: fromJS(action.profile.subscribed_subjects)
      })
  }
  return state;
}

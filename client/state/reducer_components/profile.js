import {Map, fromJS} from 'immutable';

export default function profile(state = Map(), action) {
  switch (action.type) {
    case 'RECEIVE_PROFILE':
      return state.merge({
        displayName: fromJS(action.profile.displayName),
        _id: fromJS(action.profile._id),
        study_maps: fromJS(action.profile.study_maps),
        points: fromJS(action.profile.points)
      })
  }
  return state;
}

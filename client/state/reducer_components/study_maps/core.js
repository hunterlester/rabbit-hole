import { Map, fromJS, toJS } from 'immutable';


const parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));

export const initialStudyMaps = fromJS({
  isFetching: false,
  study_maps: parsedStudyMaps || {},
});

export function setStudyMaps(state, study_maps) {
  return state.merge({
    isFetching: false,
    study_maps: study_maps
  });
}

export function postStudyMapRequest(state, action) {
  return state.merge({
    isFetching: true
  })
}

export function postStudyMapSuccess(state, action) {
  return state.setIn(['study_maps', action.response._id], fromJS(action.response)).merge({
    isFetching: false
  });
}

export function postStudyMapFailure(state, action) {
  return state.merge({
    isfetching: false,
    errorMessage: action.message
  });
}

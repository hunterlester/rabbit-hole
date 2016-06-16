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

export function apiRequest(state, action) {
  return state.merge({
    isFetching: true,
    method: action.method,
    datum: action.datum
  });
}

export function apiFailure(state, action) {
  return state.merge({
    isFetching: false,
    errorMessage: action.message
  });
}

export function postStudyMapSuccess(state, action) {
  return state.setIn(['study_maps', action.response._id], fromJS(action.response)).merge({
    isFetching: false
  });
}

export function postLinkSuccess(state, action) {
  let linkObj = action.response;
  return state.setIn(['study_maps', linkObj.study_map, 'links', linkObj._id], fromJS(linkObj)).merge({
    isFetching: false
  });
}

export function postBreadcrumbSuccess(state, action) {
  let breadcrumb = action.response;
  return state.setIn(['study_maps', breadcrumb.study_map, 'breadcrumbs', breadcrumb._id], fromJS(breadcrumb)).merge({
    isFetching: false
  });
}

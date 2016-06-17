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

export function postLinkBreadcrumbSuccess(state, action) {
  let breadObj = action.response;
  return state.setIn(['study_maps', breadObj.study_map, 'links', breadObj.link, 'breadcrumbs', breadObj._id], fromJS(breadObj)).merge({
    isFetching: false
  });
}

export function postMessageSuccess(state, action) {
  let message = action.response;
  return state.setIn(['study_maps', message.study_map, 'breadcrumbs', message.breadcrumb, 'messages', message._id], fromJS(message)).merge({
    isFetching: false
  });
}

export function postLinkMessageSuccess(state, action) {
  let messageObj = action.response;
  return state.setIn(
    ['study_maps', messageObj.study_map, 'links', messageObj.link,
    'breadcrumbs', messageObj.breadcrumb, 'messages', messageObj._id], fromJS(messageObj)).merge({
      isFetching: false
    });
}

export function updateSeen(state, action) {
  let breadObj = action.response;

  let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
  parsedStudyMaps[breadObj.study_map].breadcrumbs[breadObj._id] = breadObj;
  let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
  localStorage.setItem('study_maps', JSONstudyMaps);

  return state.updateIn(['study_maps', breadObj.study_map, 'breadcrumbs', breadObj._id, 'seen'], val => true);
}

export function updateBLinkSeen(state, action) {
  let breadLink = action.response;

  let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
  parsedStudyMaps[breadLink.study_map].links[breadLink.link].breadcrumbs[breadLink._id] = breadLink;
  let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
  localStorage.setItem('study_maps', JSONstudyMaps);

  return state.updateIn(['study_maps', breadLink.study_map, 'links', breadLink.link , 'breadcrumbs', breadLink._id, 'seen'], val => true);
}

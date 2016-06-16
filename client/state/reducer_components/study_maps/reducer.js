import { Map, fromJS, toJS } from 'immutable';
import {
  STUDY_MAPS_POST, STUDY_MAPS_POST_SUCCESS, STUDY_MAPS_POST_FAILURE,
  LINK_POST, LINK_POST_SUCCESS, LINK_POST_FAILURE,
  BREADCRUMB_POST, BREADCRUMB_POST_SUCCESS, BREADCRUMB_POST_FAILURE,
  BREADCRUMB_LINK_POST, MESSAGE_POST, LINK_MESSAGE_POST, STUDYMAP_GET, SEEN_UPDATE, BLINKSEEN_UPDATE } from './actions';
import { SET_STUDY_MAPS } from './actions';
import {
  initialStudyMaps, setStudyMaps, postRequest, postFailure,
  postStudyMapSuccess,
  postLinkSuccess,
  postBreadcrumbSuccess
} from './core';

export default function study_maps(state = initialStudyMaps, action) {
  switch (action.type) {
    case SET_STUDY_MAPS:
      return setStudyMaps(state, action.study_maps);

    case STUDY_MAPS_POST:
      return postRequest(state, action);

    case STUDY_MAPS_POST_SUCCESS:
      return postStudyMapSuccess(state, action);

    case STUDY_MAPS_POST_FAILURE:
      return postFailure(state, action);

    case LINK_POST:
      return postRequest(state, action);

    case LINK_POST_SUCCESS:
      return postLinkSuccess(state, action);

    case LINK_POST_FAILURE:
      return postFailure(state, action);

    case BREADCRUMB_POST:
      return postRequest(state, action);

    case BREADCRUMB_POST_SUCCESS:
      return postBreadcrumbSuccess(state, action);

    case BREADCRUMB_POST_FAILURE:
      return postFailure(state, action);

    case BREADCRUMB_LINK_POST:
      let breadcrumbObj = action.response;
      return state.setIn(['study_maps', breadcrumbObj.study_map, 'links', breadcrumbObj.link, 'breadcrumbs', breadcrumbObj._id], fromJS(breadcrumbObj));

    case MESSAGE_POST:
      let message = action.response;
      return state.setIn(['study_maps', message.study_map, 'breadcrumbs', message.breadcrumb, 'messages', message._id], fromJS(message));

    case LINK_MESSAGE_POST:
      let messageObj = action.response;
      return state.setIn(
        ['study_maps', messageObj.study_map, 'links', messageObj.link,
        'breadcrumbs', messageObj.breadcrumb, 'messages', messageObj._id], fromJS(messageObj));

    case SEEN_UPDATE:
      let breadObj = action.response;

      let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
      parsedStudyMaps[breadObj.study_map].breadcrumbs[breadObj._id] = breadObj;
      let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
      localStorage.setItem('study_maps', JSONstudyMaps);

      return state.updateIn(['study_maps', breadObj.study_map, 'breadcrumbs', breadObj._id, 'seen'], val => true);

    case BLINKSEEN_UPDATE:
      let breadLink = action.response;
      return state.updateIn(['study_maps', breadLink.study_map, 'links', breadLink.link , 'breadcrumbs', breadLink._id, 'seen'], val => true);

  }
  return state;
}

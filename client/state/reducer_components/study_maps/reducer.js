import { Map, fromJS, toJS } from 'immutable';

import {
  SET_STUDY_MAPS, API_REQUEST, API_FAILURE,
  STUDY_MAPS_POST_SUCCESS,
  LINK_POST_SUCCESS,
  BREADCRUMB_POST_SUCCESS,
  LINKBREADCRUMB_POST_SUCCESS,
  MESSAGE_POST_SUCCESS,
  LINKMESSAGE_POST_SUCCESS, SEEN_UPDATE, BLINKSEEN_UPDATE } from './actions';

import {
  initialStudyMaps, setStudyMaps, apiRequest, apiFailure,
  postStudyMapSuccess,
  postLinkSuccess,
  postBreadcrumbSuccess,
  postLinkBreadcrumbSuccess,
  postMessageSuccess,
  postLinkMessageSuccess
} from './core';

export default function study_maps(state = initialStudyMaps, action) {
  switch (action.type) {
    case SET_STUDY_MAPS:
      return setStudyMaps(state, action.study_maps);

    case API_REQUEST:
      return apiRequest(state, action);

    case API_FAILURE:
      return apiFailure(state, action);

    case STUDY_MAPS_POST_SUCCESS:
      return postStudyMapSuccess(state, action);

    case LINK_POST_SUCCESS:
      return postLinkSuccess(state, action);

    case BREADCRUMB_POST_SUCCESS:
      return postBreadcrumbSuccess(state, action);

    case LINKBREADCRUMB_POST_SUCCESS:
      return postLinkBreadcrumbSuccess(state, action);

    case MESSAGE_POST_SUCCESS:
      return postMessageSuccess(state, action);

    case LINKMESSAGE_POST_SUCCESS:
      return postLinkMessageSuccess(state, action);

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

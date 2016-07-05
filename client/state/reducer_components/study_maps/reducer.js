import { Map, fromJS, toJS } from 'immutable';

import {
  SET_STUDY_MAPS, API_REQUEST, API_FAILURE,
  STUDY_MAPS_POST_SUCCESS,
  LINK_POST_SUCCESS,
  LINK_UPDATE_SUCCESS,
  BREADCRUMB_POST_SUCCESS,
  LINKBREADCRUMB_POST_SUCCESS,
  MESSAGE_POST_SUCCESS,
  LINKMESSAGE_POST_SUCCESS,
  SEEN_UPDATE_SUCCESS,
  BLINKSEEN_UPDATE_SUCCESS } from './actions';

import {
  initialStudyMaps, setStudyMaps, apiRequest, apiFailure,
  postStudyMapSuccess,
  postLinkSuccess,
  updateLinkSucess,
  postBreadcrumbSuccess,
  postLinkBreadcrumbSuccess,
  postMessageSuccess,
  postLinkMessageSuccess,
  updateSeen,
  updateBLinkSeen
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

    case LINK_UPDATE_SUCCESS:
      return updateLinkSucess(state, action);

    case BREADCRUMB_POST_SUCCESS:
      return postBreadcrumbSuccess(state, action);

    case LINKBREADCRUMB_POST_SUCCESS:
      return postLinkBreadcrumbSuccess(state, action);

    case MESSAGE_POST_SUCCESS:
      return postMessageSuccess(state, action);

    case LINKMESSAGE_POST_SUCCESS:
      return postLinkMessageSuccess(state, action);

    case SEEN_UPDATE_SUCCESS:
      return updateSeen(state, action);

    case BLINKSEEN_UPDATE_SUCCESS:
      return updateBLinkSeen(state, action);
  }
  return state;
}

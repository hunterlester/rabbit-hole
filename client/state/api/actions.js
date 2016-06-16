import { CALL_API } from '../middleware/api';
import {
  API_REQUEST, API_FAILURE,
  STUDY_MAPS_POST_SUCCESS,
  LINK_POST_SUCCESS,
  BREADCRUMB_POST_SUCCESS,
  BREADCRUMB_LINK_POST, MESSAGE_POST, LINK_MESSAGE_POST, STUDYMAP_GET, SEEN_UPDATE, BLINKSEEN_UPDATE } from '../reducer_components/study_maps/actions';

export function postStudyMap(study_map) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'studymaps',
      authenticated: true,
      types: [API_REQUEST, STUDY_MAPS_POST_SUCCESS, API_FAILURE],
      formObj: study_map
    }
  }
}

export function postLink(linkObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'links/studymap',
      authenticated: true,
      types: [API_REQUEST, LINK_POST_SUCCESS, API_FAILURE],
      formObj: linkObj
    }
  }
}

export function postBreadcrumb(breadcrumbObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'breadcrumbs/studymap',
      authenticated: true,
      types: [API_REQUEST, BREADCRUMB_POST_SUCCESS, API_FAILURE],
      formObj: breadcrumbObj
    }
  }
}

export function postLinkBreadcrumb(breadcrumbObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'breadcrumbs/link',
      authenticated: true,
      types: [BREADCRUMB_LINK_POST, BREADCRUMB_LINK_POST_SUCCESS, BREADCRUMB_LINK_POST_FAILURE],
      formObj: breadcrumbObj
    }
  }
}

export function postMessage(messageObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'messages',
      authenticated: true,
      types: [MESSAGE_POST, MESSAGE_POST_SUCCESS, MESSAGE_POST_FAILURE],
      formObj: messageObj
    }
  }
}

export function postLinkMessage(messageObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'messages',
      authenticated: true,
      types: [LINK_MESSAGE_POST, LINK_MESSAGE_POST_SUCCESS, LINK_MESSAGE_POST_FAILURE],
      formObj: messageObj
    }
  }
}

export function postSubject(subjectObj) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'subjects',
      authenticated: true,
      types: [SUBJECT_POST, SUBJECT_POST_SUCCESS, SUBJECT_POST_FAILURE],
      formObj: subjectObj
    }
  }
}

export function updateSeen(data, breadcrumbID) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `breadcrumbs/seen/${breadcrumbID}`,
      authenticated: true,
      types: [SEEN_UPDATE, SEEN_UPDATE_SUCCESS, SEEN_UPDATE_FAILURE],
      formObj: data
    }
  }
}

export function updateBLinkSeen(data, breadcrumbID) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `breadcrumbs/seen/${breadcrumbID}`,
      authenticated: true,
      types: [BLINKSEEN_UPDATE, BLINKSEEN_UPDATE_SUCCESS, BLINKSEEN_UPDATE_FAILURE],
      formObj: data
    }
  }
}

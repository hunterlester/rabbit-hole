import { CALL_API } from '../middleware/api';

import {
  API_REQUEST, API_FAILURE,
  STUDY_MAPS_POST_SUCCESS,
  LINK_POST_SUCCESS,
  LINK_UPDATE_SUCCESS,
  BREADCRUMB_POST_SUCCESS,
  LINKBREADCRUMB_POST_SUCCESS,
  MESSAGE_POST_SUCCESS,
  LINKMESSAGE_POST_SUCCESS,
  SEEN_UPDATE_SUCCESS,
  BLINKSEEN_UPDATE_SUCCESS } from '../reducer_components/study_maps/actions';

import { SUBJECT_POST_SUCCESS } from '../reducer_components/subjects/actions';

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

export function updateLink(linkObj) {
  return {
    [CALL_API]: {
      method: 'PUT',
      endpoint: `links/${linkObj._id}`,
      authenticated: true,
      types: [API_REQUEST, LINK_UPDATE_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, LINKBREADCRUMB_POST_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, MESSAGE_POST_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, LINKMESSAGE_POST_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, SUBJECT_POST_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, SEEN_UPDATE_SUCCESS, API_FAILURE],
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
      types: [API_REQUEST, BLINKSEEN_UPDATE_SUCCESS, API_FAILURE],
      formObj: data
    }
  }
}

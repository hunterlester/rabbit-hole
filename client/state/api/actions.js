import { CALL_API } from '../middleware/api';

export const STUDY_MAPS_POST = 'STUDY_MAPS_POST';
export const STUDY_MAPS_SUCCESS = 'STUDY_MAPS_SUCCESS';
export const STUDY_MAPS_FAILURE = 'STUDY_MAPS_FAILURE';

export const LINK_POST = 'LINK_POST';
export const LINK_POST_SUCCESS = 'LINK_POST_SUCCESS';
export const LINK_POST_FAILURE = 'LINK_POST_FAILURE';

export const BREADCRUMB_POST = 'BREADCRUMB_POST';
export const BREADCRUMB_POST_SUCCESS = 'BREADCRUMB_POST_SUCCESS';
export const BREADCRUMB_POST_FAILURE = 'BREADCRUMB_POST_FAILURE';

export const SEEN_UPDATE = 'SEEN_UPDATE';
export const SEEN_UPDATE_SUCCESS = 'SEEN_UPDATE_SUCCESS';
export const SEEN_UPDATE_FAILURE = 'SEEN_UPDATE_FAILURE';

export const BLINKSEEN_UPDATE = 'SEEN_UPDATE';
export const BLINKSEEN_UPDATE_SUCCESS = 'SEEN_UPDATE_SUCCESS';
export const BLINKSEEN_UPDATE_FAILURE = 'SEEN_UPDATE_FAILURE';

export const BREADCRUMB_LINK_POST = 'BREADCRUMB_LINK_POST';
export const BREADCRUMB_LINK_POST_SUCCESS = 'BREADCRUMB_LINK_POST_SUCCESS';
export const BREADCRUMB_LINK_POST_FAILURE = 'BREADCRUMB_LINK_POST_FAILURE';

export const MESSAGE_POST = 'MESSAGE_POST';
export const MESSAGE_POST_SUCCESS = 'MESSAGE_POST_SUCCESS';
export const MESSAGE_POST_FAILURE = 'MESSAGE_POST_FAILURE';

export const LINK_MESSAGE_POST = 'LINK_MESSAGE_POST';
export const LINK_MESSAGE_POST_SUCCESS = 'LINK_MESSAGE_POST_SUCCESS';
export const LINK_MESSAGE_POST_FAILURE = 'LINK_MESSAGE_POST_FAILURE';

export const SUBJECT_POST = 'SUBJECT_POST';
export const SUBJECT_POST_SUCCESS = 'SUBJECT_POST_SUCCESS';
export const SUBJECT_POST_FAILURE = 'SUBJECT_POST_FAILURE';

export function postStudyMap(study_map) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'studymaps',
      authenticated: true,
      types: [STUDY_MAPS_POST, STUDY_MAPS_SUCCESS, STUDY_MAPS_FAILURE],
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
      types: [LINK_POST, LINK_POST_SUCCESS, LINK_POST_FAILURE],
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
      types: [BREADCRUMB_POST, BREADCRUMB_POST_SUCCESS, BREADCRUMB_POST_FAILURE],
      formObj: breadcrumbObj
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

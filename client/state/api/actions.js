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

export const BREADCRUMB_LINK_POST = 'BREADCRUMB_LINK_POST';
export const BREADCRUMB_LINK_POST_SUCCESS = 'BREADCRUMB_LINK_POST_SUCCESS';
export const BREADCRUMB_LINK_POST_FAILURE = 'BREADCRUMB_LINK_POST_FAILURE';

export const MESSAGE_POST = 'MESSAGE_POST';
export const MESSAGE_POST_SUCCESS = 'MESSAGE_POST_SUCCESS';
export const MESSAGE_POST_FAILURE = 'MESSAGE_POST_FAILURE';

export const STUDYMAP_GET = 'STUDYMAP_GET';
export const STUDYMAP_GET_SUCCESS = 'STUDYMAP_GET_SUCCESS';
export const STUDYMAP_GET_FAILURE = 'STUDYMAP_GET_FAILURE';

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

export function getStudyMap(studyMapID) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `studymaps/${studyMapID}`,
      authenticated: true,
      types: [STUDYMAP_GET, STUDYMAP_GET_SUCCESS, STUDYMAP_GET_FAILURE]
    }
  }
}

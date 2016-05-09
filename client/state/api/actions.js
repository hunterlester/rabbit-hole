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

export const SET_STUDY_MAPS = 'SET_STUDY_MAPS';
export const API_REQUEST = 'API_REQUEST';
export const API_FAILURE = 'API_FAILURE';

export const STUDY_MAPS_POST_SUCCESS = 'STUDY_MAPS_POST_SUCCESS';

export const LINK_POST_SUCCESS = 'LINK_POST_SUCCESS';

export const BREADCRUMB_POST_SUCCESS = 'BREADCRUMB_POST_SUCCESS';

export const LINKBREADCRUMB_POST_SUCCESS = 'LINKBREADCRUMB_POST_SUCCESS';

export const MESSAGE_POST_SUCCESS = 'MESSAGE_POST_SUCCESS';

export const LINKMESSAGE_POST_SUCCESS = 'LINKMESSAGE_POST_SUCCESS';

export const SUBJECT_POST = 'SUBJECT_POST';
export const SUBJECT_POST_SUCCESS = 'SUBJECT_POST_SUCCESS';
export const SUBJECT_POST_FAILURE = 'SUBJECT_POST_FAILURE';

export const SEEN_UPDATE = 'SEEN_UPDATE';
export const SEEN_UPDATE_SUCCESS = 'SEEN_UPDATE_SUCCESS';
export const SEEN_UPDATE_FAILURE = 'SEEN_UPDATE_FAILURE';

export const BLINKSEEN_UPDATE = 'SEEN_UPDATE';
export const BLINKSEEN_UPDATE_SUCCESS = 'SEEN_UPDATE_SUCCESS';
export const BLINKSEEN_UPDATE_FAILURE = 'SEEN_UPDATE_FAILURE';

export function setStudyMapsAction(study_maps) {
  return {
    type: SET_STUDY_MAPS,
    study_maps
  };
}

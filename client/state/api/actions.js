import { CALL_API } from '../middleware/api';

export const STUDY_MAPS_POST = 'STUDY_MAPS_POST';
export const STUDY_MAPS_SUCCESS = 'STUDY_MAPS_SUCCESS';
export const STUDY_MAPS_FAILURE = 'STUDY_MAPS_FAILURE';

export function postStudyMap(study_map) {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: 'studymaps',
      authenticated: true,
      types: [STUDY_MAPS_POST, STUDY_MAPS_SUCCESS, STUDY_MAPS_FAILURE],
      study_map
    }
  }
}

export const SET_STUDY_MAPS = 'SET_STUDY_MAPS';
// export const PUSH_STUDY_MAP = 'PUSH_STUDY_MAP';

export function setStudyMaps(study_maps) {
  return {
    type: SET_STUDY_MAPS,
    study_maps
  };
}

// COMMENTED OUT FOR DELETION. CHECK FOR REDUNDANCY
//
// export function pushStudyMap(study_map) {
//   return {
//     type: PUSH_STUDY_MAP,
//     study_map
//   };
// }

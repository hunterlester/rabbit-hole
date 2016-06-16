export const SUBJECT_POST_SUCCESS = 'SUBJECT_POST_SUCCESS';
export const SET_SUBJECTS = 'SET_SUBJECTS';

export function setSubjectsAction(state) {
  return {
    type: SET_SUBJECTS,
    state
  }
}

// USE: `meta: {remote: true}` to transmit actions to server

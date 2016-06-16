import {Map, fromJS} from 'immutable';
import { SET_SUBJECTS, SUBJECT_POST_SUCCESS } from './actions';
import {initialSubjects, setSubjects, postSubjectSuccess} from './core';


export default function subjects(state = initialSubjects, action) {
  switch (action.type) {
    case SET_SUBJECTS:
      return setSubjects(state, action);

    case SUBJECT_POST_SUCCESS:
      return postSubjectSuccess(state, action);
  }
  return state;
}

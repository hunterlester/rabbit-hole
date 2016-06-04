import {Map, fromJS} from 'immutable';

import { SUBJECT_POST } from '../api/actions.js';

let initialSubjects = fromJS({
  subjects: JSON.parse(localStorage.getItem('subjects'))
})

export default function subjects(state = initialSubjects, action) {
  switch (action.type) {
    case 'SET_SUBJECTS':
      return state.merge({
        subjects: fromJS(action.state.subjects)
      })

    case SUBJECT_POST:
      return state.setIn(['subjects', action.response._id], fromJS(action.response));
  }
  return state;
}

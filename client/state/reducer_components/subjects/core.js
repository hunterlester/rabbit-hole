import {Map, fromJS} from 'immutable';

export const initialSubjects = fromJS({
  subjects: JSON.parse(localStorage.getItem('subjects'))
})

export function setSubjects(state, action) {
  return state.merge({
    subjects: fromJS(action.state.subjects)
  })
}

export function postSubjectSuccess(state, action) {
  return state.setIn(['subjects', action.response._id], fromJS(action.response)).merge({
    isFetching: false
  });
}

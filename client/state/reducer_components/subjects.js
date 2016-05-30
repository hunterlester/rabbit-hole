import {Map, fromJS} from 'immutable';

let initialSubjects = fromJS({
  subjects: JSON.parse(localStorage.getItem('subjects'))
})

export default function subjects(state = initialSubjects, action) {
  switch (action.type) {
    case 'SET_SUBJECTS':
      return state.merge({
        subjects: fromJS(action.state.subjects)
      })
  }
  return state;
}

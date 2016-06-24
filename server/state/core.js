import {fromJS, Map} from 'immutable';

export const initialState = Map();

export function setEchoes(state, echoes) {
  return state.set('echoes', fromJS(echoes));
}

export function postEcho(state, echo) {
  const echoes = state.get('echoes');
  return state.merge({
    echoes: echoes.push(fromJS(echo))
  })
}

export function setSubjects(state, subjects) {
  return state.set('subjects', fromJS(subjects));
}

export function postSubject(state, subject) {
  const subjects = state.get('subjects');
  return state.merge({
    subjects: subjects.push(fromJS(subject))
  })
}

export function setUsers(state, users) {
  return state.set('users', fromJS(users));
}

export function reserveNewUserInfo(state, user) {
  const userObj = Object.assign({}, {
    _id: user._id,
    displayName: user.displayName,
    username: user.username
  });
  const users = state.get('users');
  return state.merge({
    users: users.push(fromJS(userObj))
  })

}

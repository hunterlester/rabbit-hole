import {setEchoes, postEcho, setSubjects, postSubject} from './core';
import { initialState } from './core';

export default function reducer(state = initialState , action) {
  switch (action.type) {
    case 'SET_ECHOES':
      return setEchoes(state, action.echoes);

    case 'POST_ECHO':
      return postEcho(state, action.echo);

    case 'SET_SUBJECTS':
      return setSubjects(state, action.subjects);

    case 'SUBJECT_POST':
      return postSubject(state, action.response);

  }
  return state;
}

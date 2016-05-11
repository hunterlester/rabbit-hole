import {setEchoes, postEcho} from './core';
import { initialState } from './core';

export default function reducer(state = initialState , action) {
  switch (action.type) {
    case 'SET_ECHOES':
      return setEchoes(state, action.echoes);

    case 'POST_ECHO':
      return postEcho(state, action.echo);
  }
  return state;
}

import {setEchoes} from './core';

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_ECHOES':
      return setEchoes(state, action.echoes);
  }
  return state;
}

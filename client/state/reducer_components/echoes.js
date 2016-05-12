import {Map, fromJS} from 'immutable';

export default function echoes(state = Map(), action) {
  switch (action.type) {
    case 'SET_ECHOES':
      return state.merge({
        echoes: fromJS(action.state.echoes)
      })
  }
  return state;
}

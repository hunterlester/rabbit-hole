import {Map, fromJS} from 'immutable';

export const initialEchoes = fromJS({
  echoes: JSON.parse(localStorage.getItem('echoes'))
});

export function setEchoes(state, action) {
  return state.merge({
    echoes: fromJS(action.state.echoes)
  })
}

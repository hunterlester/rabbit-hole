import {Map, fromJS} from 'immutable';

let initialEchoes = fromJS({
  echoes: JSON.parse(localStorage.getItem('echoes'))
})

export default function echoes(state = initialEchoes, action) {
  switch (action.type) {
    case 'SET_ECHOES':
      return state.merge({
        echoes: fromJS(action.state.echoes)
      })
  }
  return state;
}

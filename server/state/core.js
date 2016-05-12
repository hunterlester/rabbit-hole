import {fromJS, Map} from 'immutable';

export const initialState = Map();

export function setEchoes(state, echoes) {
  return state.set('echoes', fromJS((echoes)));
}

export function postEcho(state, echo) {
  const echoes = state.get('echoes');
  return state.merge({
    echoes: echoes.push(fromJS(echo))
  })
}

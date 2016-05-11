import {fromJS} from 'immutable';

export function setEchoes(state, echoes) {
  return state.set('echoes', fromJS(JSON.parse(echoes)));
}

export function postEcho(state, echo) {
  const echoes = state.get('echoes');
  return state.merge({
    echoes: echoes.push(fromJS(JSON.parse(echo)))
  })
}
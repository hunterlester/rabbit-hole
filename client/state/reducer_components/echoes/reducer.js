import { Map, fromJS } from 'immutable';
import { SET_ECHOES } from './actions';
import { initialEchoes, setEchoes } from './core';

export default function echoes(state = initialEchoes, action) {
  switch (action.type) {
    case SET_ECHOES:
      return setEchoes(state, action);
  }
  return state;
}

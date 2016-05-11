import {Map, List, fromJS} from 'immutable';


const initialState = fromJS({
  isFetching: false,
  echoes: []
});

export default function echoes(state = List(), action) {
  switch (action.type) {
    case SET_ECHOES:
      return state.merge({
        echoes: action.echoes
      })
  }
  return state;
}

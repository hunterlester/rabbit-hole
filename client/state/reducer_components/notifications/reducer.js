import { fromJS } from 'immutable';
import {
  REQUEST_CONFIRM, RECEIVE_CONFIRM, FAILURE_CONFIRM
} from './actions';

const initialState = fromJS({
  isFetching: false
});

export default function notify(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CONFIRM:
      return state.merge({
        isFetching: true,
        address: action.address
      })

    case RECEIVE_CONFIRM:
      return state.merge({
        isFetching: false,
        message: action.message
      })

    case FAILURE_CONFIRM:
      return state.merge({
        isFetching: false,
        errorMessage: action.err
      })
  }
  return state;
}

import { fromJS } from 'immutable';
import {
  REQUEST_CONFIRM, RECEIVE_CONFIRM, FAILURE_CONFIRM,
  REQUEST_CONFIRM_EMAIL, RECEIVE_CONFIRM_EMAIL, FAILURE_CONFIRM_EMAIL,
  REQUEST_RESET_EMAIL, RECEIVE_RESET_EMAIL, FAILURE_RESET_EMAIL,
  REQUEST_RESET, RECEIVE_RESET, FAILURE_RESET,
  CLEAR_NOTIFY
} from './actions';

const initialState = fromJS({
  isFetching: false
});

export default function notify(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RESET:
      return state.merge({
        isFetching: true,
        message: 'Email sent to confirm reset'
      })

    case RECEIVE_RESET:
      return state.merge({
        isFetching: false,
        message: action.message
      })

    case FAILURE_RESET:
      return state.merge({
        isFetching: false,
        errorMessage: action.err
      })

    case REQUEST_RESET_EMAIL:
      return state.merge({
        isFetching: true,
        address: action.address
      })

    case RECEIVE_RESET_EMAIL:
      return state.merge({
        isFetching: true,
        message: action.message
      })

    case FAILURE_RESET_EMAIL:
      return state.merge({
        isFetching: false,
        errorMessage: action.err
      })

    case REQUEST_CONFIRM_EMAIL:
      return state.merge({
        isFetching: true,
        address: action.address
      })

    case RECEIVE_CONFIRM_EMAIL:
      return state.merge({
        isFetching: false,
        message: action.message
      })

    case FAILURE_CONFIRM_EMAIL:
      return state.merge({
        isFetching: false,
        errorMessage: action.err
      })

    case REQUEST_CONFIRM:
      return state.merge({
        isFetching: true
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

    case CLEAR_NOTIFY:
      return state.merge({
        message: '',
        errorMessage: ''
      })
  }
  return state;
}

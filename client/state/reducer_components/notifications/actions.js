export const REQUEST_CONFIRM = 'REQUEST_CONFIRM';
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM';
export const FAILURE_CONFIRM = 'FAILURE_CONFIRM';

export function requestConfirmation(user) {
  return {
    type: REQUEST_CONFIRM,
    isFetching: true,
    address: user.username
  }
}

export function receiveConfirmation(msg) {
  return {
    type: RECEIVE_CONFIRM,
    isFetching: false,
    message: msg
  }
}

export function failuerConfirmation(err) {
  return {
    type: FAILURE_CONFIRM,
    isFetching: false,
    err
  }
}

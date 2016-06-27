export const REQUEST_CONFIRM = 'REQUEST_CONFIRM';
export const RECEIVE_CONFIRM = 'RECEIVE_CONFIRM';
export const FAILURE_CONFIRM = 'FAILURE_CONFIRM';

export const REQUEST_CONFIRM_EMAIL = 'REQUEST_CONFIRM_EMAIL';
export const RECEIVE_CONFIRM_EMAIL = 'RECEIVE_CONFIRM_EMAIL';
export const FAILURE_CONFIRM_EMAIL = 'FAILURE_CONFIRM_EMAIL';

export const CLEAR_NOTIFY = 'CLEAR_NOTIFY';

export function requestConfirmationEmail(user) {
  return {
    type: REQUEST_CONFIRM_EMAIL,
    isFetching: true,
    address: user.username
  }
}

export function receiveConfirmationEmail(msg) {
  return {
    type: RECEIVE_CONFIRM_EMAIL,
    isFetching: false,
    message: msg
  }
}

export function failureConfirmationEmail(err) {
  return {
    type: FAILURE_CONFIRM_EMAIL,
    isFetching: false,
    err
  }
}

export function requestConfirmation(user) {
  return {
    type: REQUEST_CONFIRM,
    isFetching: true
  }

}

export function receiveConfirmation(msg) {
  return {
    type: RECEIVE_CONFIRM,
    isFetching: false,
    message: 'Email confirmed!'
  }

}

export function failureConfirmation(err) {
  return {
    type: FAILURE_CONFIRM,
    isFetching: false,
    err
  }
}

export function clearNotify() {
  return {
    type: CLEAR_NOTIFY,
    message: ''
  }
}

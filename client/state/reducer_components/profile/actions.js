export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const UPDATE_SUBSCRIPTIONS = 'UPDATE_SUBSCRIPTIONS';
export const UPDATE_SUBSCRIPTIONS_REQUEST = 'UPDATE_SUBSCRIPTIONS_REQUEST';

export function updateSubscriptions(subjects) {
  return {
    type: UPDATE_SUBSCRIPTIONS,
    isFetching: false,
    subjects
  }
}

export function subscription_request() {
  return {
    type: UPDATE_SUBSCRIPTIONS_REQUEST,
    isFetching: true
  }
}

export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile
  }
}

export function updateSubjects(subjects) {
  return {
    type: 'PROFILE_SUBJECT_UPDATE',
    subjects
  }
}

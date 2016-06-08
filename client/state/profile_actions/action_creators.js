export function receiveProfile(profile) {
  return {
    type: 'RECEIVE_PROFILE',
    profile
  }
}

export function updateSubjects(subjects) {
  return {
    type: 'PROFILE_SUBJECT_UPDATE',
    subjects
  }
}

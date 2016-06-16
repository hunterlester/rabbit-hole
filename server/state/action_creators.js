export function postEcho(echo) {
  return {
    type: 'POST_ECHO',
    echo
  }
}

export function postSubject(subject) {
  return {
    type: 'POST_SUBJECT',
    subject
  }
}

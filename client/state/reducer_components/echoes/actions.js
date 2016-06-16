export const SET_ECHOES = 'SET_ECHOES';

export function setEchoesAction(state) {
  return {
    type: SET_ECHOES,
    state
  }
}

// USE: `meta: {remote: true}` to transmit actions to server

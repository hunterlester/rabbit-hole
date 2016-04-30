import { CALL_API } from '../middleware/api';

export const ENTRIES_POST = 'ENTRIES_POST';
export const ENTRIES_SUCCESS = 'ENTRIES_SUCCESS';
export const ENTRIES_FAILURE = 'ENTRIES_FAILURE';

export function postEntry(entry) {
  return {
    [CALL_API]: {
      endpoint: 'entries',
      authenticated: true,
      types: [ENTRIES_POST, ENTRIES_SUCCESS, ENTRIES_FAILURE],
      entry
    }
  }
}

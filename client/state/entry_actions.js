export const SET_ENTRIES = 'SET_ENTRIES';
export const PUSH_ENTRY = 'PUSH_ENTRY';

export function setEntries(entries) {
  return {
    type: SET_ENTRIES,
    entries
  };
}

export function pushEntry(entry) {
  return {
    type: PUSH_ENTRY,
    entry
  };
}

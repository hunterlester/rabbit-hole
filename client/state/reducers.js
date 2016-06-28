import { combineReducers } from 'redux';

import echoes from './reducer_components/echoes/reducer';
import subjects from './reducer_components/subjects/reducer';
import profile from './reducer_components/profile/reducer';
import auth from './reducer_components/auth/reducer';
import study_maps from './reducer_components/study_maps/reducer';
import notify from './reducer_components/notifications/reducer';

const reducers = combineReducers({
  auth,
  study_maps,
  echoes,
  profile,
  subjects,
  notify
});

export default reducers;

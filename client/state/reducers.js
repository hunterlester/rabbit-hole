import { combineReducers } from 'redux';

import echoes from './reducer_components/echoes/reducer';
import subjects from './reducer_components/subjects/reducer';
import profile from './reducer_components/profile';
import auth from './reducer_components/auth';
import study_maps from './reducer_components/study_maps/reducer';

const reducers = combineReducers({
  auth,
  study_maps,
  echoes,
  profile,
  subjects
});

export default reducers;

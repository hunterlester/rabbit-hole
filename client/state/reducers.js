import { combineReducers } from 'redux';

import echoes from './reducer_components/echoes';
import profile from './reducer_components/profile';
import auth from './reducer_components/auth';
import study_maps from './reducer_components/study_maps';

const reducers = combineReducers({
  auth,
  study_maps,
  echoes,
  profile
});

export default reducers;

import { combineReducers } from 'redux';

import annotationSeed from './annotationSeedReducer';
import control from './controlReducers';
import data from './dataReducer';

export default combineReducers({
  data,
  control,
  annotationSeed
});

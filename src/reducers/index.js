import { combineReducers } from 'redux';

import control from './controlReducers';
import data from './dataReducer';
import annotationSeed from './annotationSeedReducer';

export default combineReducers({
  data,
  control,
  annotationSeed
});

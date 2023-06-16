import { combineReducers } from 'redux';

import control from './controlReducers';
import geojsonData from './dataReducer';
import dsAnnotate from './dsAnnotateReducer';

export default combineReducers({
  geojsonData,
  control,
  dsAnnotate
});

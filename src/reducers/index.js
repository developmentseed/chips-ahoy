import { combineReducers } from 'redux';

import control from './controlReducers';
import geojsonData from './dataReducer';

export default combineReducers({
  geojsonData,
  control
});

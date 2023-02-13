import { combineReducers } from 'redux';

import user from './module/user';
import location from './module/location';
import typeSwitch from './module/typeSwitch';

export default combineReducers({
  user,
  location,
  typeSwitch,
});

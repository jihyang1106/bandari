import { combineReducers } from 'redux';

import user from './module/user';
import location from './module/location';
import typeSwitch from './module/typeSwitch';
import sellCategorySwitch from './module/sellCategorySwitch';
import pets from './module/pets';

export default combineReducers({
  user,
  location,
  typeSwitch,
  sellCategorySwitch,
  pets,
});

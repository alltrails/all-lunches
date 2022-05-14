import { combineReducers } from 'redux';

import app from './app/reducer';
import ui from './ui/reducer';
import user from './user/reducer';
import map from './map/reducer';

export default combineReducers({
  app,
  ui,
  user,
  map,
});

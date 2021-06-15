import { combineReducers } from 'redux';
import progress from './progress';
import status from './status';
import studies from './studies';
import study from './study';
import user from './user';

export default combineReducers ({
  progress,
  status,
  studies,
  study,
  user,
});

import { combineReducers } from 'redux';
import auth from './auth';
import progressCalculations from './progressCalculations';
import studies from './studies';
import study from './study';

export default combineReducers({
  auth,
  study,
  studies,
  progressCalculations,
});

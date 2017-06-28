import { combineReducers } from 'redux';
import * as timesheetsReducer from './timesheets';
import * as firebaseReducer from './firebase';

export default combineReducers(Object.assign(
  timesheetsReducer,
  firebaseReducer,
));

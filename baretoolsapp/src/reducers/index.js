import { combineReducers } from 'redux';
import * as customersReducer from './customers';
import * as timesheetsReducer from './timesheets';

export default combineReducers(Object.assign(
  customersReducer,
  timesheetsReducer,
));

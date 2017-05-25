import { combineReducers } from 'redux';
import * as customersReducer from './customers';

export default combineReducers(Object.assign(
  customersReducer
));

import { combineReducers } from 'redux';
import * as firebaseReducer from './firebase';

export default combineReducers(Object.assign(
  firebaseReducer,
));

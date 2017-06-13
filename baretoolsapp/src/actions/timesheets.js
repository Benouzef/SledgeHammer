import * as types from '../utilities/types';
import { timesheetsRef } from '../utilities/firebase';

export function addTimesheet(customerId, year, month) {
  const timesheetRef = timesheetsRef.child(customerId).child(year).child(month);

  timesheetRef.set({
    amountOfWork: 0,
    lastStatus: 'Forecast',
    workUnit: 'days'
  })

  return {
    type: types.TIMESHEETS_ADD
  }
}

export function addTimesheetSuccess(timesheetData) {
  return {
    type: types.TIMESHEETS_ADD_SUCCESS,
    timesheetData: timesheetData
  }
}

export function removeTimesheet(id) {
  timesheetsRef.child(id).remove();
  return {
    type: types.TIMESHEETS_REMOVE,
  }
}

export function removeTimesheetSuccess(id) {
  return {
    type: types.TIMESHEETS_REMOVE_SUCCESS,
    id: id
  }
}

export function startFetchingTimesheets() {
  return {
    type: types.TIMESHEETS_START_FETCHING
  }
}

export function doneFetchingTimesheets() {
  return {
    type: types.TIMESHEETS_DONE_FETCHING
  }
}

import * as types from '../utilities/types';
import { timesheetsRef } from '../utilities/firebase';
import { signInWithGoogleAsync, setApiToken, copySpreadSheet, moveSpreadSheet, getIndeptiveFolder, enterDataInSpreadSheet } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';
import { listenChildAdded, listenChildChanged, listenToPath, updateItem } from './firebase';
import type {
  MetaType, UpdateItemsActions, RemoveItemActions, ListenToPathActions
} from '../utilities/types';
import { metaTypes } from '../utilities/types';


export function listenToTimesheets(path) {
  return listenToPath(metaTypes.timesheets, path);
}

export function addDayToCurrentTimesheet(customerId, year, month, day, amount, token, spreadsheetId) {

  return (dispatch: ListenToPathActions => void, getState: () => Object) => {
    const concatDay = year + '' + month + '' + day;
    const timesheetRef = timesheetsRef.child(customerId).child(year).child(month).child('enteredData').child(concatDay);

    const timesheet = {
      amount: amount,
    };

    timesheetRef.set(timesheet);

    setApiToken(token);

    enterDataInSpreadSheet(spreadsheetId, 'Days!A2:C2', [year,month,day]);
    enterDataInSpreadSheet(spreadsheetId, 'Days!E2:E2', [amount]);

    timesheetsRef.child(customerId).once('value').then(function(snapshot) {
        dispatch(listenChildChanged(metaTypes.timesheets, customerId, snapshot.val()));
    });

  }
}

export function addTimesheet(customerId, customerName, year, month, token) {
  const timesheetRef = timesheetsRef.child(customerId).child(year).child(month);

  setApiToken(token);


  getIndeptiveFolder().then(function (folder) {
    return folder;
  }).then(function(folder) {
    var result = copySpreadSheet(folder.id);
    return result;
  }).then(function (result) {
    return moveSpreadSheet(result[1], `${year}${month}_${customerName} Timesheet`, result[0]);
  }).then(function (spreadsheetId) {
    returnedSpreadsheetId = spreadsheetId.id;
    return enterDataInSpreadSheet(spreadsheetId.id, 'Timesheets!B14:C14', [month,year]);
  }).then(function(spreadsheetId) {
    return timesheetRef.set({
      spreadsheetId: `${spreadsheetId}`,
      amountOfWork: 0,
      lastStatus: 'Forecast',
      workUnit: 'days'
    })
  });

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

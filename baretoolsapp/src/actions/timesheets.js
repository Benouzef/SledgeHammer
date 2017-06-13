import * as types from '../utilities/types';
import { timesheetsRef } from '../utilities/firebase';
import { signInWithGoogleAsync, setApiToken, createSpreadSheet, moveSpreadSheet, getIndeptiveFolder, enterDataInSpreadSheet } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';


export function addTimesheet(customerId, year, month, token) {
  const timesheetRef = timesheetsRef.child(customerId).child(year).child(month);

  timesheetRef.set({
    amountOfWork: 0,
    lastStatus: 'Forecast',
    workUnit: 'days'
  })

  const day = 10;
  //const user = GoogleSignIn.signInPromise();
  setApiToken(token);

  getIndeptiveFolder().then(function (folder) {
    return folder;
  }).then(function(folder) {
    var result = [];
    console.log('folder');
    console.log(folder);
    return createSpreadSheet(folder.id);
  }).then(function (result) {
    console.log('result');
    console.log(result);
    return moveSpreadSheet(result[1], 'Mon timesheet de moi', result[0]);
  }).then(function (spreadsheetId) {
    console.log('spreadsheetId');
    console.log(spreadsheetId);
    console.log(spreadsheetId.id);
    return enterDataInSpreadSheet(spreadsheetId.id, 'Sheet1!A1:C1', [year,month,day]);
  });

  /*console.log('folder');
  console.log(folder);

  createSpreadSheet().then(function(spreadsheetId) {
    console.log('folder');
    console.log(folder);
    return moveSpreadSheet(spreadsheetId, 'Mon timesheet de moi', folder.id);
  }
);*/

  //enterDataInSpreadSheet(spreadsheetId, 'Sheet1!C6', 'Coucou Benoit');

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

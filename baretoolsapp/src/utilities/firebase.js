import * as firebase from 'firebase';
import { listenToCustomers, addCustomerSuccess, removeCustomerSuccess, startFetching, doneFetching } from '../actions/customers';
import { addTimesheetSuccess, removeTimesheetSuccess, startFetchingTimesheets, doneFetchingTimesheets } from '../actions/timesheets';
import { signInWithGoogleAsync } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyArfXpOpXbubB-7X3wO0CK2YRHpJGiAH8M',
  authDomain: 'bare-tools.firebaseio.com',
  databaseURL: 'https://bare-tools.firebaseio.com',
  storageBucket: 'bare-tools.appspot.com'
})

export const customersRef = firebaseApp.database().ref('customers');
const connectedRef = firebaseApp.database().ref('.info/connected');

export let timesheetsRef = firebaseApp.database().ref('dev/timesheets');

export function syncFirebase(store, accessToken) {
  // sign in using google access token provided in app init
  firebaseApp.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, accessToken));

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Customers
      store.dispatch(listenToCustomers());

      /*customersRef.on('child_added', (snapshot) => {
        store.dispatch(startFetching());
        store.dispatch(addCustomerSuccess(snapshot.val()));
        store.dispatch(doneFetching());
      });

      customersRef.on('child_removed', (snapshot) => {
        store.dispatch(removeCustomerSuccess(snapshot.val().id));
      });
      */



      // Timesheets
      timesheetsRef = firebaseApp.database().ref('dev/timesheets/' + firebaseApp.auth().currentUser.uid);
      /*
      timesheetsRef.on('child_added', (snapshot) => {
        store.dispatch(startFetchingTimesheets());
        store.dispatch(addTimesheetSuccess(snapshot.val()));
        store.dispatch(doneFetchingTimesheets());
      });

      timesheetsRef.on('child_changed', (snapshot) => {
        console.log('snapshot.val()');
        console.log(snapshot.val());
      });

      timesheetsRef.on('child_removed', (snapshot) => {
        store.dispatch(removeTimesheetSuccess(snapshot.val().id));
      });
      */

    } else {
      // No user is signed in.
    }
  });
}

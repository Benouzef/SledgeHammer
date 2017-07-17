import * as firebase from 'firebase';
import { listenToCustomers } from '../actions/customers';
import { listenToTimesheets } from '../actions/timesheets';
import { signInWithGoogleAsync } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyArfXpOpXbubB-7X3wO0CK2YRHpJGiAH8M',
  authDomain: 'bare-tools.firebaseio.com',
  databaseURL: 'https://bare-tools.firebaseio.com',
  storageBucket: 'bare-tools.appspot.com'
})

export const customersRef = firebaseApp.database().ref('customers');
export let customersPath = 'customers';
const connectedRef = firebaseApp.database().ref('.info/connected');


export let timesheetsRef = firebaseApp.database().ref('dev/timesheets');


export function syncFirebase(store, accessToken) {
  // sign in using google access token provided in app init
  firebaseApp.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, accessToken));

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Customers
      store.dispatch(listenToCustomers());

      // Timesheets
      const path = 'dev/timesheets/' + firebaseApp.auth().currentUser.uid;
      timesheetsRef = firebaseApp.database().ref(path);
      store.dispatch(listenToTimesheets(path));
    } else {
      // No user is signed in.
      console.log('no user is signed in');
    }
  });
}

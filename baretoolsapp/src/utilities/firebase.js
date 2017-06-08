import * as firebase from 'firebase';
import { addCustomerSuccess, removeCustomerSuccess, startFetching, doneFetching } from '../actions/customers';
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

export const timesheetsRef = firebaseApp.database().ref('dev/timesheets'+firebaseApp.auth().currentUser.getToken());

export function syncFirebase(store) {

  //TODO: replace with Google Sign in
  //firebaseApp.auth().signInWithCredential
  //firebaseApp.auth().signInAnonymously();
  //console.log(firebaseApp.auth().currentUser.getToken());

  //signInWithGoogleAsync();
  /*GoogleSignIn.configure({
    clientID: '484760334438-h1av8l1pas6flr6anj5qpl6u3j511s62.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
    shouldFetchBasicProfile: true,
  })

  let user = GoogleSignIn.signInPromise();
  console.log('user');
  console.log(user);
  firebaseApp.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, user.accessToken));
*/
  customersRef.on('child_added', (snapshot) => {
    store.dispatch(startFetching());
    console.log('child_added');
    console.log(snapshot.val());
    store.dispatch(addCustomerSuccess(snapshot.val()));
    store.dispatch(doneFetching());
  });

  customersRef.on('child_removed', (snapshot) => {
    console.log(snapshot.val().id);
    store.dispatch(removeCustomerSuccess(snapshot.val().id));
  });

  // Timesheets
  timesheetsRef.on('child_added', (snapshot) => {
    store.dispatch(startFetchingTimesheets());
    console.log('child_added');
    console.log(snapshot.val());
    store.dispatch(addTimesheetSuccess(snapshot.val()));
    store.dispatch(doneFetchingTimesheets());
  });

  timesheetsRef.on('child_removed', (snapshot) => {
    console.log(snapshot.val().id);
    store.dispatch(removeTimesheetSuccess(snapshot.val().id));
  });

  /*connectedRef.on('value', snap => {
    console.log(snap.val());
    if (snap.val() === true) {
      store.dispatch(goOnline());
    }
  });*/
}

import * as firebase from 'firebase';
import { listenToCustomers } from '../actions/customers';
import { signInWithGoogleAsync } from '../utilities/google';
import GoogleSignIn from 'react-native-google-sign-in';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD6CQW8nUxUJ5g5c7PXmwyWGWPEQXL5EBA',
  authDomain: 'skillvaluemasterclass.firebaseio.com',
  databaseURL: 'https://skillvaluemasterclass.firebaseio.com',
  storageBucket: 'skillvaluemasterclass.appspot.com'
})

export const customersRef = firebaseApp.database().ref('customers');
export let customersPath = 'customers';
const connectedRef = firebaseApp.database().ref('.info/connected');

export function syncFirebase(store, accessToken) {
  // sign in using google access token provided in app init
  firebaseApp.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, accessToken));
  //firebaseApp.auth().signInAnonymously();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Customers
      store.dispatch(listenToCustomers());
    } else {
      // No user is signed in.
      console.log('no user is signed in');
    }
  });
}

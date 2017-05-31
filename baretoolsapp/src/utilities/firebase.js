import * as firebase from 'firebase';
import { addCustomerSuccess, removeCustomerSuccess, startFetching, doneFetching } from '../actions/customers';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyArfXpOpXbubB-7X3wO0CK2YRHpJGiAH8M',
  authDomain: 'bare-tools.firebaseio.com',
  databaseURL: 'https://bare-tools.firebaseio.com',
  storageBucket: 'bare-tools.appspot.com'
})

export const customersRef = firebaseApp.database().ref('customers');
const connectedRef = firebaseApp.database().ref('.info/connected');

export function syncFirebase(store) {

  //TODO: replace with Google Sign in
  firebaseApp.auth().signInAnonymously();

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

  /*connectedRef.on('value', snap => {
    console.log(snap.val());
    if (snap.val() === true) {
      store.dispatch(goOnline());
    }
  });*/
}

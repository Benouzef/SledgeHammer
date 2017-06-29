import * as types from '../utilities/types';
import { firebaseApp, customersRef, timesheetsRef } from '../utilities/firebase';

import { addTimesheet } from './timesheets';
import { listenChildAdded, listenToPath } from './firebase';

import type {
  MetaType, UpdateItemsActions, RemoveItemActions, ListenToPathActions
} from '../utilities/types';
import { metaTypes } from '../utilities/types';


export function listenToCustomers() {
  return listenToPath(metaTypes.customers, 'customers');
}

export function addCustomer(name, year, month, token) {

  return (dispatch: ListenToPathActions => void, getState: () => Object) => {

    const id = Math.random().toString(36).substring(7);
    const customerRef = customersRef.child(id);

    const customer = {
      id,
      name: name,
      time: new Date().getTime(),
      url: 'fake'
    }

    customerRef.set(customer);

    dispatch(listenChildAdded('customers', id, customer));

    dispatch(addTimesheet(id, year, month, token));

  }
}

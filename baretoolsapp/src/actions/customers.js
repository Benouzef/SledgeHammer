import * as types from '../utilities/types';
import { firebaseApp, customersRef, customersPath } from '../utilities/firebase';

import { addTimesheet } from './timesheets';
import { listenChildAdded, listenChildChanged, listenToPath, updateItem } from './firebase';

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
    const datetime = new Date().getTime();

    const customer = {
      id,
      name: name,
      creationTime: datetime,
      updateTime: dateime,
      url: 'fake'
    }

    customerRef.set(customer);

    dispatch(listenChildAdded(metaTypes.customers, id, customer));

    dispatch(addTimesheet(id, year, month, token));

  }
}

export function updateCustomer(customer: Object) {
  return (dispatch: ListenToPathActions => void, getState: () => Object) => {
    const customerRef = customersRef.child(customer.id);
    customerRef.set(customer);

    dispatch(listenChildChanged(metaTypes.customers, customer.id, customer));
  }
}

import * as types from '../utilities/types';
import { customersRef, timesheetsRef } from '../utilities/firebase';

export function addCustomer(name) {
  const id = Math.random().toString(36).substring(7);
  const customerRef = customersRef.child(id);

  customerRef.set({
    id,
    name: name,
    time: new Date().getTime()
  });

  const newTimesheetRef = timesheetsRef.child(id);
  newTimesheetRef.set(
    {
      // TODO: Set proper initial timesheet info when adding a new customer (merge calls done in NavigationTextHeader)
      '2017': {
        '06': {
          amountOfWork: 0,
          lastStatus: 'Pending',
          workUnit: 'days'
        }
      },
      customerId: id,
      customerName: name,
      missionType: '1-Full time'
    }
  );

  return {
    type: types.ADD_CUSTOMER,
    id: id
  }
}

export function addCustomerSuccess(customerData) {

  return {
    type: types.ADD_CUSTOMER_SUCCESS,
    customerData: customerData
  }
}

export function removeCustomer(id) {
  customersRef.child(id).remove();

  return {
    type: types.REMOVE_CUSTOMER,
  }
}

export function removeCustomerSuccess(id) {
  return {
    type: types.REMOVE_CUSTOMER_SUCCESS,
    id: id
  }
}

export function startFetching() {
  return {
    type: types.START_FETCHING
  }
}

export function doneFetching() {
  return {
    type: types.DONE_FETCHING
  }
}

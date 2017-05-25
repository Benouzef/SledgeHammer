import * as types from '../utilities/types';

export function fetchCustomers() {

  return (dispatch, getState) => {
    const t = [{id: "1", key:"1", name: "FINALCAD"},{id: "2", key: "2", name: "LINKBYNET"}];
    console.log(t);
    return dispatch(setSearchedCustomers(
          t
    ));
  }
}

export function setSearchedCustomers(customers) {
  console.log(customers);
  return {
    type: types.SET_SEARCHED_CUSTOMERS,
    customers
  }
};

import createReducer from '../utilities/createReducer';
import * as types from '../utilities/types';

export const searchedCustomers = createReducer({}, {
  [types.SET_SEARCHED_CUSTOMERS](state, action) {
    console.log(state);
    console.log(action);
    let newState = {};
    action.customers.forEach( (customer) => {
      console.log(customer);
      let id = customer.id;
      newState[id] = Object.assign({}, customer, { id });
    });
    return newState;
  },

});

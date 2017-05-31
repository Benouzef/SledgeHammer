import createReducer from '../utilities/createReducer';
import * as types from '../utilities/types';

export const searchedCustomers = createReducer({}, {
  [types.ADD_CUSTOMER_SUCCESS](state, action) {
    console.log('ADD_CUSTOMER_SUCCESS');
    console.log(state);
    console.log(action);
    let list = [];
    if (state.customers) {
      list = state.customers.concat([action.customerData]).sort((a, b) => b.time - a.time);
    } else {
      list.push(action.customerData);
    }

    return {
      ...state,
      customers: list
    }
  },

  [types.START_FETCHING](state, action) {
    console.log(state);
    console.log(action);

    return {
      ...state,
      fetching: true
    }
  },

  [types.DONE_FETCHING](state, action) {
    console.log(state);
    console.log(action);

    return {
      ...state,
      fetching: false
    }
  },

  [types.REMOVE_CUSTOMER_SUCCESS](state, action) {
    console.log(state);
    console.log(action);
    let list = state.customers.slice(0);
    const index = list.map(i => i.id).indexOf(action.id);
    list.splice(index, 1);

    return {
      ...state,
      customers: list
    }
  },

});

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

  [types.ADD_CUSTOMER_SUCCESS](state = initialState, action) {
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

////////////////////
const initialState = {
  customers: [],
  connected: false
}

/*export default function customersReducerForFireBase(state = initialState, action) {
  let list;

  console.log(action);
  switch (action.type) {

  case types.REMOVE_CUSTOMER_SUCCESS:
    list = state.customers.slice(0)
    const index = list.map(i => i.id).indexOf(action.id)
    list.splice(index, 1)

    return {
      ...state,
      customers: list
    }
  case types.CONNECTION_ONLINE:
    return {
      ...state,
      connected: true
  }
  default:
    return state
  }
}*/

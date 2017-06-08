import createReducer from '../utilities/createReducer';
import * as types from '../utilities/types';

export const searchedTimesheets = createReducer({}, {
  [types.TIMESHEETS_ADD_SUCCESS](state, action) {
    let list = [];
    if (state.timesheets) {
      list = state.customers.concat([action.timesheetData]).sort((a, b) => b.time - a.time);
    } else {
      list.push(action.timesheetData);
    }

    return {
      ...state,
      timesheets: list
    }
  },

  [types.TIMESHEETS_START_FETCHING](state, action) {
    return {
      ...state,
      fetchingTimesheets: true
    }
  },

  [types.TIMESHEETS_DONE_FETCHING](state, action) {
    return {
      ...state,
      fetchingTimesheets: false
    }
  },

  [types.TIMESHEETS_REMOVE_SUCCESS](state, action) {
    let list = state.timesheets.slice(0);
    const index = list.map(i => i.id).indexOf(action.id);
    list.splice(index, 1);

    return {
      ...state,
      timesheets: list
    }
  },
});

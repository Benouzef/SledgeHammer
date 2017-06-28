import * as CustomersActions from './customers';
import * as TimesheetsActions from './timesheets';
import * as FirebaseActions from './firebase';

export const ActionCreators = Object.assign({},
  CustomersActions,
  TimesheetsActions,
  FirebaseActions,
);

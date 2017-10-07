import * as CustomersActions from './customers';
import * as FirebaseActions from './firebase';

export const ActionCreators = Object.assign({},
  CustomersActions,
  FirebaseActions,
);

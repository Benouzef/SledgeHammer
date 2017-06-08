import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/reducers';

import { initialized, syncFirebase } from './src/utilities/firebase';

import { signInWithGoogleAsync } from './src/utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';


// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {

  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  const store = createStore(reducer, initialState, enhancer);
  syncFirebase(store);

  return store;
}

const store = configureStore({});

const BaretoolsApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('baretoolsapp', () => BaretoolsApp);

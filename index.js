import { AppRegistry } from 'react-native';
import configureStore from './configureStore';
import App from './App';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

const store = configureStore('http://localhost:8080/api/v1');

const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )

AppRegistry.registerComponent('NativeStarter', () => ReduxApp);

import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import { Tabs } from '../navigation/router';

export default class App extends Component {
  render() {
    return (
      <Tabs/>
    );
  }
}

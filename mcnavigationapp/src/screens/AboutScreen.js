import React from 'react';
import { WebView } from 'react-native';

export default class AboutScreen extends React.Component {
  render() {
    return (
        <WebView
          source={{uri: 'http://www.skillvalue.com'}}
        />
    );
  }
}

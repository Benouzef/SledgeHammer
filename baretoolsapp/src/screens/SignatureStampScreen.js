import React from 'react';
import { View, WebView, StyleSheet } from 'react-native';

export default class SignatureStampScreen extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    style: View.propTypes.style,
    penColor: React.PropTypes.string,
    dataURL: React.PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {
    },
    onError: () => {

    },
    style: {flex: 1, backgroundColor: 'white', marginTop: 20, height: 100}
  };

  constructor(props) {
    super(props);
  }

  _onNavigationChange = (args) => {
    console.log(unescape(args.url));

    // save screenshot to drive

  };

  _renderError = (args) => {
    console.log(args);
  };

  _renderLoading = (args) => {

  };

  render() {
    return (
      <View ref='full' style={this.props.style} collapsable={false}>
        <WebView automaticallyAdjustContentInsets={false}
           onNavigationStateChange={this._onNavigationChange}
           renderError={this._renderError}
           renderLoading={this._renderLoading}
           source={require('../assets/html/signature.html')} //{this.source}//{{uri: 'https://github.com/facebook/react-native'}}
           javaScriptEnabled={true}
           style={this.props.style}/>
      </View>
    );
  }
}

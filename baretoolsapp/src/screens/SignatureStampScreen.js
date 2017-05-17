import React from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import { takeSnapshot } from "react-native-view-shot";

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
    var returnedHash = unescape(args.url);
    console.log(unescape(args.url));

    if(returnedHash.includes('message')) {
      // save screenshot to drive
      takeSnapshot(this.refs['full'],
        { result: 'base64', format: 'png' }
      )
      .then(
        uri => console.log("Image saved to", uri),
        error => console.error("Oops, snapshot failed", error)
      );
    }
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

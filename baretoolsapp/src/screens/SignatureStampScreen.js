import React from 'react';
import { View, WebView, StyleSheet, Text } from 'react-native';
import { takeSnapshot } from 'react-native-view-shot';
import { signInWithGoogleAsync, setApiToken, uploadFile } from '../utilities/GoogleDrive';
import { NavigationActions } from 'react-navigation';
import GoogleSignIn from 'react-native-google-sign-in';

export default class SignatureStampScreen extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    style: View.propTypes.style,
    penColor: React.PropTypes.string,
    dataURL: React.PropTypes.string,
  };

  getInitialState() {
    return {
      isLoading: true,
      snapshotNotDone: true
    };
  }

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

  componentWillMount() {
    this.setState({
        isLoading: true,
        snapshotNotDone: true
      });
  }

  async componentDidMount() {
    await signInWithGoogleAsync();

    user = await GoogleSignIn.signInPromise();

    console.log(user);
    console.log(user.accessToken);
    setApiToken(user.accessToken);

    this.setState({
        isLoading: false
      });
  }

  _onNavigationChange = (args) => {
    var returnedHash = unescape(args.url);
    console.log(unescape(args.url));

    if(returnedHash.includes('message')) {
      setTimeout(() => {}, 1000);
      // save screenshot to drive
      takeSnapshot(this.refs['full'],
        { result: 'base64', format: 'png' }
      )
      .then(
        uri => this._uploadSignature(uri),
        error => console.error("Oops, snapshot failed", error)
      );

      this.setState({
        snapshotNotDone: false
      });
    }
  };



  _renderError = (args) => {
    console.log(args);
  };

  _renderLoading = (args) => {

  };

  _uploadSignature = (data) => {
    console.log(data);
    uploadFile(data, this.props.navigation.state.params.signatureStampFileId, this.props.navigation.state.params.indeptiveFolderId);
    const backAction = NavigationActions.back({
      key: 'SignatureStamp'
    });
    this.props.navigation.dispatch(backAction);
  };

  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }
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

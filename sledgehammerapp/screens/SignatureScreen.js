import React from 'react';
import { Modal } from 'react-native';
import { WebView, ScrollView, TouchableOpacity, Icon, View, Image } from '@shoutem/ui';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import SignaturePad from '../components/react-native-signature-pad-master';
import { takeSnapshot } from "../components/react-native-view-shot-master";
//import { RNFS } from '../components/exponent-react-native-fs-master';

const catsSource = {
  uri: "https://i.imgur.com/5EOyTDQ.jpg",
};


export default class SignatureScreen extends React.Component {

  state = {
    previewSource: catsSource,
    error: null,
    res: null,
    value: {
      format: "png",
      quality: 0.9,
      result: "file",
      snapshotContentContainer: false,
    },
  };

  static route = {
    navigationBar: {
      title: 'Profil',
    },
  };

  render = () => {
    return (
        <SignaturePad onError={this._signaturePadError}
                      onChange={this._signaturePadChange}
                      style={{flex: 1, backgroundColor: 'yellow', marginTop: 20, height: 100}}/>

    )
  };

  _signaturePadError = (error) => {
    //RNFS.createFile(RNFS.PicturesDirectoryPath + '/toto.png', error, 'base64');
    console.warn(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
  };
}

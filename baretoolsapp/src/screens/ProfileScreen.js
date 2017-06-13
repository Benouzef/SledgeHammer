import React from 'react';
import { ScrollView, StyleSheet, Image, Text, Button, View, TouchableOpacity } from 'react-native';
import { Form, Item, Label, Input } from 'native-base';
import { signInWithGoogleAsync, getSignatureStamp, setApiToken, getIndeptiveFolder } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';
import * as firebase from 'firebase';

import { firebaseApp } from '../utilities/firebase';

let user = null;
let signatureStampFile = null;
let urlForSignature = null;
let indeptiveFolderId = null;
let signatureStampFileId = null;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
        isLoading: true
      });
  }

  async componentDidMount() {
    await signInWithGoogleAsync();
    user = await GoogleSignIn.signInPromise();

    setApiToken(user.accessToken);

    const indeptiveFolder = await getIndeptiveFolder();
    indeptiveFolderId = indeptiveFolder.id;
    signatureStampFile = await getSignatureStamp(indeptiveFolder);
    if (signatureStampFile == null) {
      urlForSignature = null;
      signatureStampFileId = null
    } else {
      signatureStampFileId = signatureStampFile.id;
      urlForSignature = signatureStampFile.thumbnailLink.replace('&export=download','');
      this.props.urlForSignature = urlForSignature;
    }

    this.setState({
        isLoading: false
      });
  }


  render() {
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>
        <Text>PERSONAL INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Full Name</Label>
            <Input value={user.name}/>
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Phone</Label>
            <Input />
          </Item>
        </Form>
        <Text>COMPANY INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Company Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address Line #1</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address Line #2</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company nature</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Registration office</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Reg. #</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Company Code</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>VAT # (if applicable)</Label>
            <Input />
          </Item>
        </Form>
        <Text>BANK INFORMATION</Text>
        <Form>
          <Item floatingLabel>
            <Label>Bank</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>IBAN</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>BIC</Label>
            <Input />
          </Item>
        </Form>
        <Text>SIGNATURE STAMP</Text>
        <TouchableOpacity
          onPress={
            () => this.props.navigation.navigate('SignatureStamp',
              {
                urlForSignature: `${urlForSignature}`,
                signatureStampFileId: `${signatureStampFileId}`,
                indeptiveFolderId: `${indeptiveFolderId}`
              }
            )}>
        {urlForSignature ? (
            <Image
              style={{height: 200, width:200}}
              source={{uri: `${urlForSignature}`}}
              />
        ) : (
            <Image style={{height: 200, width:200}}
              source={require('../assets/images/signature-icon.png')} />
        )}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

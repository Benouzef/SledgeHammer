import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { signInWithGoogleAsync, setApiToken, createSpreadSheet } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';

export default class MissionDetailScreen extends React.Component {

  async componentDidMount() {
    await signInWithGoogleAsync();

    user = await GoogleSignIn.signInPromise();
    setApiToken(user.accessToken);

    await createSpreadSheet();
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Mission Detail Screen</Text>
        <Text>Step 1 : save data to google sheet</Text>

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

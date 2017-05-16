import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Profile Screen</Text>

        <Button
          onPress={() => this.props.navigation.navigate('SignatureStamp')}
          title="Go to Signature stamp details"
        />
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

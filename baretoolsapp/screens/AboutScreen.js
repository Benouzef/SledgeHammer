import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class AboutScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'About',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>About Indeptive.com</Text>

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

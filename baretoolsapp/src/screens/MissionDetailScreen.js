import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MissionDetailScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Mission Detail Screen</Text>

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

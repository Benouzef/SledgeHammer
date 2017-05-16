import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class CustomerDetailScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Customer Detail Screen</Text>

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

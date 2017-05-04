import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class CustomersScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Customers',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text>Customers Screen</Text>

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

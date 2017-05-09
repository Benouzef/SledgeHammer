import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

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
        >

        <Text>Customers Screen</Text>

        <Button
          onPress={() => this.props.navigation.navigate('CustomerDetail')}
          title="Go to Customer details"
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

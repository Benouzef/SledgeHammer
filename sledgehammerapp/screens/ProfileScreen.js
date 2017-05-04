import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text>Profile Screen</Text>

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

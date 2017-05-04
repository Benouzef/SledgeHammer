import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MissionDetailScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'MissionDetail',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

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

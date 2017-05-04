import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default class MissionsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Missions',
    },
  };

  _goToScreen = name => () => {
    this.props.navigator.push(name);
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text>Missions Screen</Text>
        <Button onPress={this._goToScreen('missiondetail')} title="Go To Details" color="#841584" />

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

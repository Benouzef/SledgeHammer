import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default class MissionsScreen extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Missions Screen</Text>

        <Button
          onPress={() => this.props.navigation.navigate('MissionDetail')}
          title="Go to Mission details"
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

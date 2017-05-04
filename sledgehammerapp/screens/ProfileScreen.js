import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';

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
        <TextInput style={{color: 'blue'}} placeholder={'Nom de ma structure'}/>
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

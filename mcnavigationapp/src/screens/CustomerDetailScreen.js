import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, Picker, View } from 'react-native';

export default class CustomerDetailScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ScrollView
        style={styles.container}
        >
        <Text>CUSTOMER DETAILS</Text>
        <TextInput
          autoCapitalize='characters'
          maxLenght={50}
          placeholder='Company name'
          editable={true}
        />
        <TextInput
          maxLenght={50}
          placeholder='Web site'
          keyboardType='url'
          editable={true}
        />
        <TextInput
          autoCapitalize='words'
          maxLenght={50}
          placeholder='Contact Name'
          editable={true}
        />
        <TextInput
          maxLenght={50}
          keyboardType='email-address'
          placeholder='Contact Email'
          editable={true}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'column'
  },
});

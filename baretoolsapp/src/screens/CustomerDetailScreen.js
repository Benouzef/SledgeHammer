import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default class CustomerDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: `${navigation.state.params.customerDetail.name}`,
      });

  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    let name = '';
    if (params.customerDetail.name != '') name = params.customerDetail.name;
    return (
      <ScrollView
        style={styles.container}
        >
        <Text>CUSTOMER DETAILS</Text>
        <TextInput
          autoCapitalize='characters'
          maxLenght={50}
          placeholder='Company name'
          defaultValue={name}
          editable={true}
        />
        <TextInput
          maxLenght={50}
          placeholder='Web site'
          keyboardType='url'
          value={params.customerDetail.url}
          editable={true}
        />
        <TextInput
          autoCapitalize='words'
          maxLenght={50}
          placeholder='Contact Name'
          value={params.customerDetail.contactName}
          editable={true}
        />
        <TextInput
          maxLenght={50}
          keyboardType='email-address'
          placeholder='Contact Email'
          value={params.customerDetail.contactEmail}
          editable={true}
        />
        <Text>MY MISSION</Text>
        <TextInput
          autoCapitalize='words'
          maxLenght={50}
          placeholder='Role'
          value={params.customerDetail.role}
          editable={true}
        />
        <TextInput
          maxLenght={50}
          keyboardType='numeric'
          placeholder='Rate'
          value={params.customerDetail.rate}
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
  },
});

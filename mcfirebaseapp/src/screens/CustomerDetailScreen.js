import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, Picker, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


class CustomerDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: `${navigation.state.params.customerDetail.name}`,
      });

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.customerDetail.name,
      url: this.props.navigation.state.params.customerDetail.url,
      contactEmail: this.props.navigation.state.params.customerDetail.contactEmail,
      contactName: this.props.navigation.state.params.customerDetail.contactName,

    };
  }

  saveCustomerDetails() {

    const customer = {
      id: this.props.navigation.state.params.customerDetail.id,
      name: this.state.name,
      url: this.state.url,
      contactName: this.state.contactName,
      contactEmail: this.state.contactEmail,

      updateTime: new Date().getTime(),
      creationTime: this.props.navigation.state.params.customerDetail.creationTime
    };

    this.props.updateCustomer(customer);
  }

  render() {

    const { params } = this.props.navigation.state;
    let name = '';
    if (params.customerDetail.name != '') name = params.customerDetail.name;

    const name2 = this.props.customers[params.id].name;

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
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          maxLenght={50}
          placeholder='Web site'
          keyboardType='url'
          value={this.state.url}
          editable={true}
          onChangeText={(url) => this.setState({url})}
        />
        <TextInput
          autoCapitalize='words'
          maxLenght={50}
          placeholder='Contact Name'
          defaultValue={this.state.contactName}
          editable={true}
          onChangeText={(contactName) => this.setState({contactName})}
        />
        <TextInput
          maxLenght={50}
          keyboardType='email-address'
          placeholder='Contact Email'
          defaultValue={this.state.contactEmail}
          editable={true}
          onChangeText={(contactEmail) => this.setState({contactEmail})}
        />

        <Button onPress={() => this.saveCustomerDetails()} color='#28a9e1' title='Save' disabled={this.state.isSaving}/>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    updateCustomer: state.firebaseReducer.updateCustomer,
    customers: state.firebaseReducer.customers.items
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailScreen);

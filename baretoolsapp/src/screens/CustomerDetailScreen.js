import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, Button, Picker } from 'react-native';
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
      role:this.props.navigation.state.params.customerDetail.role,
      rate:this.props.navigation.state.params.customerDetail.rate,
      rateUnit:this.props.navigation.state.params.customerDetail.rateUnit,
      missionType:this.props.navigation.state.params.customerDetail.missionType,
      isSaving: false
    };
  }

  saveCustomerDetails() {
    console.log('Company name', this.state.name);
    console.log('Url', this.state.url);
    console.log('this.props.navigation.state.params', this.props.navigation.state.params);
    const customer = {
      id: this.props.navigation.state.params.customerDetail.id,
      name: this.state.name,
      url: this.state.url,
      contactName: this.state.contactName,
      contactEmail: this.state.contactEmail,
      role: this.state.role,
      rate: this.state.rate,
      rateUnit: this.state.rateUnit,
      missionType: this.state.missionType,
      updateTime: new Date().getTime(),
      creationTime: this.props.navigation.state.params.customerDetail.creationTime
    };

    this.setState({isSaving: true});

    console.log('customer', customer);
    this.props.updateCustomer(customer);

    this.setState({isSaving: false});
  }

  render() {
    const { params } = this.props.navigation.state;
    let name = '';
    let showActivityIndicator = false;
    showActivityIndicator = this.state.isSaving;
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
        <Text>MY MISSION</Text>
        <TextInput
          autoCapitalize='words'
          maxLenght={50}
          placeholder='Role'
          defaultValue={this.state.role}
          editable={true}
          onChangeText={(role) => this.setState({role})}
        />
        <TextInput
          maxLenght={50}
          keyboardType='numeric'
          placeholder='Rate'
          defaultValue={this.state.rate}
          editable={true}
          onChangeText={(rate) => this.setState({rate})}
        />
        <Picker
          selectedValue={this.state.rateUnit}
          onValueChange={(itemValue, itemIndex) => this.setState({rateUnit: itemValue})}>
          <Picker.Item label="Euros (€)" value="Euros" />
          <Picker.Item label="Dollars ($)" value="Dollars" />
        </Picker>
        <Picker
          selectedValue={this.state.missionType}
          onValueChange={(itemValue, itemIndex) => this.setState({missionType: itemValue})}>
          <Picker.Item label="Full Time" value="1-Full Time" />
          <Picker.Item label="Part Time" value="2-Part Time" />
        </Picker>
        <Button onPress={() => this.saveCustomerDetails()} title='Save' disabled={this.state.isSaving}/>
        <Button title='Save2' disabled={true}/>
        {showActivityIndicator && (
        <ActivityIndicator
          style={{ height: 80 }}
          color="#C00"
          size="large"
        />)
        }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    updateCustomer: state.firebaseReducer.updateCustomer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailScreen);

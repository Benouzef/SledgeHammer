import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, TouchableHighlight, View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCustomers();
  }


  customers() {
    console.log(this.props.searchedCustomers)
    return Object.keys(this.props.searchedCustomers).map(key => this.props.searchedCustomers[key])
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Customers Screen</Text>
        {
          this.customers().map((customer) => {
            return <TouchableHighlight key={customer.key}  style={styles.searchButton} onPress={ () => this.props.navigation.navigate('CustomerDetail') }>
            <View>
              <Text style={ styles.resultText }>{customer.name}</Text>
            </View>
          </TouchableHighlight>
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  searchButton: {
    flex: 0.3,
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    searchedCustomers: state.searchedCustomers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);

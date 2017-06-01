import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, TouchableHighlight, View, ListView, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import NavigationTextHeader from '../components/NavigationTextHeader';

class CustomersScreen extends Component {
  static navigationOptions = () => {
      return {
          headerRight: <NavigationTextHeader />
      };
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow(rowData) {
    console.log('rowData!');
    console.log(rowData);

    return (
      <Text style={ styles.resultText }>{rowData.name}</Text>
    )
  }

  render() {
    console.log('PROPS!');
    console.log(this.props);
    console.log(this.props.fetching);

    let isReady = false;
    if (this.props.fetching === false) isReady = true;
    if (this.props.fetching) isReady = false;

    if (isReady) {
      items = this.props.customers
      readonlyMessage = null;
    } else {
      items = []
      readonlyMessage = <Text style={styles.loading}>Loading...</Text>
    }

    return (
      <ScrollView
        style={styles.container}
        >
        {readonlyMessage}




          <ListView
          dataSource={this.dataSource.cloneWithRows(items)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
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
  searchButton: {
    flex: 0.3,
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  },
  loading: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    addCustomer: state.searchedCustomers.addCustomer,
    customers: state.searchedCustomers.customers,
    fetching: state.searchedCustomers.fetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);

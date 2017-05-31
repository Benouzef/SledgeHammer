import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Button, TouchableHighlight, View, ListView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.props.fetchCustomers();
  }

  renderRow(rowData) {
    console.log('rowData!');
    console.log(rowData);

    return (
      <Text style={ styles.resultText }>{rowData.name}</Text>
    )
  }


  customers() {
    console.log(this.props.searchedCustomers)
    return Object.keys(this.props.searchedCustomers).map(key => this.props.searchedCustomers[key]);
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
    searchedCustomers: state.searchedCustomers,
    customers: state.searchedCustomers.customers,
    fetching: state.searchedCustomers.fetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);

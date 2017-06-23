import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View, ListView, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import TimesheetsForACustomer from '../components/TimesheetsForACustomer';

class TimesheetsScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow(rowData) {

    return (
      <TimesheetsForACustomer
        token={this.props.screenProps}
        customerId={rowData.customerId}
        customerName={rowData.customerName}
        missionType={rowData.missionType}
        year='2017'
        dataSource={rowData} {...this.props} />
    );
  }

  render() {

    let isReady = false;
    if (this.props.fetchingTimesheets === false) isReady = true;
    if (this.props.fetchingTimesheets) isReady = false;

    if (isReady) {
      items = this.props.timesheets
      readonlyMessage = null;
    } else {
      items = []
      readonlyMessage = <Text style={styles.loading}>Loading...</Text>
    }

    return (
      <ScrollView>
        {readonlyMessage}

          <ListView contentContainerStyle={styles.list}
          dataSource={this.dataSource.cloneWithRows(items)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
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
  return {
    addTimesheet: state.searchedTimesheets.addTimesheet,
    timesheets: state.searchedTimesheets.timesheets,
    fetchingTimesheets: state.searchedTimesheets.fetchingTimesheets
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetsScreen);

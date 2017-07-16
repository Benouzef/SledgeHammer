import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View, ListView, Image, Button, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class TimesheetsForACustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {maxMonth: 0};
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  addTimesheetToCurrentCustomer() {


    let month = 0;
    if (Number.parseInt(this.state.maxMonth) <=0) {
      month = new Date().getMonth() + 1;
    } else if (Number.parseInt(this.state.maxMonth) < 12) {
      month = Number.parseInt(this.state.maxMonth) + 1;
    } else if (Number.parseInt(this.state.maxMonth) == 12) {
      month = Number.parseInt(this.state.maxMonth);
    }

    console.log('this.state.maxMonth');
    console.log(this.state.maxMonth);

    console.log('month');
    console.log(month);

    if (month <= 9) month = '0' + month;

    console.log('month');
    console.log(month);

    this.props.addTimesheet(this.props.customerId, this.props.year, month, this.props.token);
  }

  renderRow(rowData, sectionID, rowID) {

    var imgSource = {
      uri: 'http://www.execavenue.com/2016/wp-content/uploads/logo-finalcad-230x230.jpg',
    };

    if (rowID > this.state.maxMonth) {
      this.setState(
        {maxMonth: rowID}
      );
    }


    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('TimesheetDetail',
      { timesheetDetail:  rowData,
        missionType: this.props.missionType,
        month: rowID,
        year: this.props.year,
        customerId: this.props.customerId,
        token: this.props.token
      })} underlayColor='rgba(0,0,0,0)'>

        <View style={styles.row}>
          <Text style={styles.headertext}>
            {rowID} {this.props.year}
          </Text>
          <Text style={styles.centertext}>
            {rowData.amountOfWork} d
          </Text>
          <Text style={styles.footertext}>
             {rowData.lastStatus}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.customertext}>{this.props.customerName}</Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#28a9e1',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#000033',
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5
              }}
              onPress={() => this.addTimesheetToCurrentCustomer()}
            >
              <Text style={{color: 'white', padding: 5}}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <ListView contentContainerStyle={styles.list}
            dataSource={this.dataSource.cloneWithRows(this.props.dataSource[this.props.year])}
            enableEmptySections={true}
            renderRow={this.renderRow.bind(this)}
            />
          </View>
        </View>
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
  customertext: {
    padding: 5,
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  headertext: {
    flex: 0.5,
    textAlign: 'center'
  },
  centertext: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  footertext: {
    flex: 0.5,
    fontSize: 12,
    textAlign: 'center'
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
    timesheets: state.firebaseReducer.timesheets.items,
    fetchingTimesheets: state.firebaseReducer.timesheets.inProgress
    //timesheets: state.searchedTimesheets.timesheets,
    //fetchingTimesheets: state.searchedTimesheets.fetchingTimesheets
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetsForACustomer);

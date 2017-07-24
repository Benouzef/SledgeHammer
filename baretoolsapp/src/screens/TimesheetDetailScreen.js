import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, ListView } from 'react-native';
import DatePickerAndTextInput from '../components/DatePickerAndTextInput';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';


class TimesheetDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: `${navigation.state.params.customerName} - ${navigation.state.params.month}/${navigation.state.params.year}`,
      });

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  addDayToCurrentTimesheet(customerId, year, month, day, amount, token, spreadsheetId) {
    this.props.addDayToCurrentTimesheet(customerId, year, month, day, amount, token, spreadsheetId);
  }

  onDelete(item) {
    console.log('item', item);
  }

  onSave(item) {
    console.log('item', item);
    this.props.addDayToCurrentTimesheet(this.props.navigation.state.params.customerId,
      this.props.navigation.state.params.year,
      this.props.navigation.state.params.month, 10, 0, this.props.navigation.state.params.token, this.props.navigation.state.params.timesheetDetail.spreadsheetId);
  }

  renderRow(rowData, sectionID, rowID) {
    const minDate = '20170601';
    const maxDate = '20170630';
    return (
      <DatePickerAndTextInput
        date={rowID}
        minDate={minDate}
        maxDate={maxDate}
        amount={rowData.amount}
        onDelete={(item) => this.onDelete(item)}
        onSave={(item) => this.onSave(item)} />
    );
  }

  test() {
    console.log('test');
  }


  render() {
    const { params } = this.props.navigation.state;

    let message = '';
    if (params.missionType === '1-Full time') {
      message = 'You are working on a full-time mission. Please enter only time or days you WERE NOT working (except weekends & public holidays).';
    } else {
      message = 'You are working on a part-time mission. Please enter only time or days you WERE working.';
    }

    let itemsForTheList = [];

    if (params.timesheetDetail.enteredData !== undefined) {
      console.log('params.timesheetDetail.enteredData', params.timesheetDetail.enteredData);
      itemsForTheList = params.timesheetDetail.enteredData;
    }

    let countItems = 0;
    if (this.props.fetchingTimesheets === false) {
      console.log('this.props.timesheets',this.props.timesheets);
      console.log('Object.keys(this.props.timesheets)',Object.keys(this.props.timesheets));
      console.log('Object.keys(this.props.timesheets).lenght',Object.keys(this.props.timesheets).length);
      countItems = Object.keys(this.props.timesheets).length;
    }
    console.log('countItems', countItems);
    console.log('this.props.timesheets[params.year]', this.props.timesheets[params.year]);
    console.log('params.month', params.month);
    console.log('params.year', params.year);
    console.log('this.props.timesheets', this.props.timesheets);

    return (
      <ScrollView
      style={{flex: 1, flexDirection: 'column'}}
      contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
        >

        <Text>{message}</Text>
        <Text>{countItems}</Text>
        <Text>{this.props.fakeCount}</Text>


        <Button title="Add" onPress={() => this.addDayToCurrentTimesheet(params.customerId, params.year, params.month, 1, 0, params.token, params.timesheetDetail.spreadsheetId)}/>

        <ListView contentContainerStyle={styles.list}
        dataSource={this.dataSource.cloneWithRows(itemsForTheList)}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}
        />

        <Text>Status for current timesheet is: {params.timesheetDetail.lastStatus}</Text>

        <Text>Status for current timesheet is: {this.props.timesheets[params.customerId][params.year][params.month].lastStatus}</Text>

        <Button title="Save to your drive" onPress={() => this.test()}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    //flexWrap: 'wrap'
  },
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
    addDayToCurrentTimesheet: state.searchedTimesheets.addDayToCurrentTimesheet,
    timesheets: state.firebaseReducer.timesheets.items,
    fetchingTimesheets: state.firebaseReducer.timesheets.inProgress
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetDetailScreen);

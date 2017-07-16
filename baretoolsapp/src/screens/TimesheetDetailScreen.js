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

  addDayToCurrentTimesheet(customerId, year, month, day, amount, token) {
    //customerId, year, month, day, amount, token
    this.props.addDayToCurrentTimesheet(customerId, year, month, day, amount, token);
  }

  renderRow(rowData, sectionID, rowID) {
    const minDate = '20170601';
    const maxDate = '20170630';
    return (
      <DatePickerAndTextInput date={rowID} minDate={minDate} maxDate={maxDate} amount={rowData.amount} />
    );
  }

  test() {
    console.log('test', this.state);
  }


  render() {
    const { params } = this.props.navigation.state;

    let message = '';
    console.log('params.missionType', params.missionType);
    if (params.missionType === '1-Full time') {
      message = 'You are working on a full-time mission. Please enter only time or days you WERE NOT working (except weekends & public holidays).';
    } else {
      message = 'You are working on a part-time mission. Please enter only time or days you WERE working.';
    }


    return (
      <ScrollView
      style={{flex: 1, flexDirection: 'column'}}
      contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
        >

        <Text>{message}</Text>


        <Button title="Add" onPress={() => this.addDayToCurrentTimesheet(params.customerId, params.year, params.month, 21, 1, params.token)}/>

        <ListView contentContainerStyle={styles.list}
        dataSource={this.dataSource.cloneWithRows(params.timesheetDetail.enteredData)}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}
        />

        <Text>Status for current timesheet is: {params.timesheetDetail.lastStatus}</Text>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetDetailScreen);

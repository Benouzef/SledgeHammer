import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { signInWithGoogleAsync, setApiToken, createSpreadSheet, moveSpreadSheet, getIndeptiveFolder, enterDataInSpreadSheet } from '../utilities/GoogleDrive';
import GoogleSignIn from 'react-native-google-sign-in';
import DatePicker from 'react-native-datepicker';

export default class MissionDetailScreen extends React.Component {

  getInitialState() {
    return {
      spreadsheetId: null
    };
  }

  async saveDateToGoogle(date) {
    console.log(date.toString());
    var map = new Map(Object.entries(date));
    console.log(map.get('date'));
    var d = new Date(Date.parse(map.get('date')));

    console.log(d.getDate());
    console.log(d.getMonth());
    console.log(d.getFullYear());

    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    console.log(this.state.spreadsheetId);
    await enterDataInSpreadSheet(this.state.spreadsheetId, 'Sheet1!A1:C1', [year,month,day]);
  }

  async componentDidMount() {
    await signInWithGoogleAsync();

    const user = await GoogleSignIn.signInPromise();
    setApiToken(user.accessToken);

    const folder = await getIndeptiveFolder();

    spreadsheetId = await createSpreadSheet();

    this.setState({
        spreadsheetId: spreadsheetId
      });

    await moveSpreadSheet(spreadsheetId, 'Mon timesheet de moi', folder.id);

    await enterDataInSpreadSheet(spreadsheetId, 'Sheet1!C6', 'Coucou Benoit');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >

        <Text>Mission Detail Screen</Text>
        <Text>Step 1 : save data to google sheet</Text>

        <DatePicker
          style={{width: 200}}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2017-05-01"
          maxDate="2017-05-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.saveDateToGoogle({date: date})}}
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

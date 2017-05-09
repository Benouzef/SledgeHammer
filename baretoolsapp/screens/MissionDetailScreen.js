import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import FloatLabelTextInput from '../components/FloatLabelTextInput';
import {  Divider, Caption, TouchableOpacity, Icon, View } from '@shoutem/ui';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default class MissionDetailScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Scrum Master chez FINALCAD',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Divider styleName="section-header">
          <Caption>MON CLIENT</Caption>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Société'}
          value={'FINALCAD'}
        />
        <FloatLabelTextInput
          placeholder={'Responsable Client'}
          value={'Antoine Favreau (antoine.favreau@finalcad.com)'}
        />

        <Divider styleName="section-header">
          <Caption>MA MISSION</Caption>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Description'}
          value={'Scrum Master'}
        />
        <FloatLabelTextInput
          placeholder={'TJM'}
          value={'650 €'}
        />
        <FloatLabelTextInput
          placeholder={'Type de mission'}
          value={'Temps plein'}
        />

        <Divider styleName="section-header">
          <Caption>MON ACTIVITE (Mois de Mai 2017)</Caption>
          <View>
            <TouchableOpacity>
              <FontAwesome name='calendar-plus-o'
                size={28}
                color={Colors.tabIconDefault}
              />
  				  </TouchableOpacity>
          </View>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Jour(s) non travaillé(s)'}
          value={'01/05/2017'}
        />
        <FloatLabelTextInput
          placeholder={'Jour(s) non travaillé(s)'}
          value={'08/05/2017'}
        />
        <FloatLabelTextInput
          placeholder={'Total Jours travaillés'}
          value={'18'}
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

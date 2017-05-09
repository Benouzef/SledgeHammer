import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, PixelRatio } from 'react-native';
import FloatLabelTextInput from '../components/FloatLabelTextInput';
import { Icon, TouchableOpacity, Divider, Caption } from '@shoutem/ui';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profil',
    },
  };

  _goToScreen = name => () => {
    this.props.navigator.push(name);
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Divider styleName="section-header">
          <Caption>MES INFORMATIONS</Caption>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Nom complet'}
          value={'Benoit Fillon'}
        />
        <FloatLabelTextInput
          placeholder={'Email'}
          value={'benoit@indeptive.com'}
        />
        <FloatLabelTextInput
          placeholder={'Téléphone'}
          value={'06 62 07 16 45'}
        />

        <Divider styleName="section-header">
          <Caption>MA SOCIETE</Caption>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Raison Sociale'}
          value={'BOCOJELEM'}
        />
        <FloatLabelTextInput
          placeholder={'Adresse (Ligne 1)'}
          value={'10 rue Germain DARDAN'}
        />
        <FloatLabelTextInput
          placeholder={'Adresse (Ligne 2)'}
          value={'92120 MONTROUGE'}
        />
        <FloatLabelTextInput
          placeholder={'Nature de société'}
          value={'SAS au capital de 2 500 €'}
        />
        <FloatLabelTextInput
          placeholder={'RCS'}
          value={'Nanterre'}
        />
        <FloatLabelTextInput
          placeholder={'SIREN (9 chiffres)'}
          value={'124 456 231'}
        />
        <FloatLabelTextInput
          placeholder={'Code API (INSEE)'}
          value={'7022 Z'}
        />
        <FloatLabelTextInput
          placeholder={'N° TVA (si applicable)'}
          value={'FR 46 999 888 777'}
        />
        <Divider styleName="section-header">
          <Caption>MA BANQUE</Caption>
        </Divider>
        <FloatLabelTextInput
          placeholder={'Banque'}
          value={'CA Paris'}
        />
        <FloatLabelTextInput
          placeholder={'IBAN'}
          value={'FR76 1820 6003 9065 0396 6902 675'}
        />
        <FloatLabelTextInput
          placeholder={'BIC'}
          value={'AGRIFRPP882'}
        />
        <Divider styleName="section-header">
          <Caption>MA SIGNATURE</Caption>
        </Divider>
        <View>
          <TouchableOpacity styleName="flexible" onPress={this._goToScreen('signature')}>
              <Icon name='settings'/>
          </TouchableOpacity>
        </View>
        <Divider styleName="section-header">
        </Divider>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
  titleContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // selfAlign: 'center',
      // backgroundColor: '#ff0000',
  },
  textInputTitle: {
    width: 110,
    fontSize: 15,
    color: '#000',
    paddingLeft: 10,
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    height: 40,// @todo should be changed if underlined
    marginTop: 2,

  },
});

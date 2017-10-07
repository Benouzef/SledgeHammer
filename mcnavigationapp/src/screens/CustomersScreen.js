import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, Button, TouchableHighlight, View, ListView, TextInput, Image, WebView } from 'react-native';

export default class CustomersScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ScrollView>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('CustomerDetail')} underlayColor='rgba(0,0,0,0)'>
          <View>
            <View style={styles.row}>

              <WebView
                source={{uri: `https://logo.clearbit.com/www.pentalog.com`}}
                style={styles.thumb}
              />

              <Text style={styles.text}>
                PENTALOG
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
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
    width: 150,
    height: 170,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 128,
    height: 128
  },
  text: {
    flex: 0.25,
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

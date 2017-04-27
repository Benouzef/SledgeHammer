/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
 } from 'react-native';

 import MainActivity from './mainactivity';

 export default class SledgeHammer extends Component {
   render() {
     return (
       <MainActivity />
     );
   }
 }

 AppRegistry.registerComponent('SledgeHammer', () => SledgeHammer);

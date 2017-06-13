import React from 'react';
import { Image, ListView, TouchableHighlight,
  ScrollView, StyleSheet, Text, View } from 'react-native';

  var THUMB_URLS = [
    'http://findicons.com/files/icons/524/web_2/128/facebook.png',
  'http://findicons.com/files/icons/514/beer_cap_social/128/beer_cap_facebook.png',
  'http://findicons.com/files/icons/60/doodle/128/facebook.png',
  'http://findicons.com/files/icons/2137/twitter/128/twitter_48.png',
  'http://findicons.com/files/icons/1594/social_media_icons_2_0/128/facebook.png',
  'http://findicons.com/files/icons/518/free_social/128/facebook_256.png',
  'http://findicons.com/files/icons/2183/grunge_social/128/facebook.png',
  'http://findicons.com/files/icons/1574/pc_social_media/128/facebook.png',

  'http://findicons.com/files/icons/2045/social_ball/128/facebook.png',
  'http://findicons.com/files/icons/2372/pinkstrip/128/facebook.png',
  'http://findicons.com/files/icons/858/icontexto_inside/128/icontexto_inside_facebook.png',
  'http://findicons.com/files/icons/522/sweet_social_media/128/facebook.png'
  ];


export default class MissionsScreen extends React.Component {
  constructor (props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._genRows({}))
    };
  }

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({}))
    };
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  }

  //_pressData: {[key: number]: boolean};


  render() {
    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }

  componentWillMount() {
    /*this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds)
    });*/
    //this._pressData = {};
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = {
      uri: THUMB_URLS[rowHash % THUMB_URLS.length],
    };
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor='rgba(0,0,0,0)'>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID: number) {
    
  }

}



var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  container: {
    flex: 1,
    paddingTop: 15,
  }
});

import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import {  View,
          GridRow,
          ListView,
          Card,
          TouchableOpacity,
          Title,
          Subtitle,
          Image,
          Divider,
          Caption,
          Tile,
          DropDownMenu,
          Icon,
          Typography
} from '@shoutem/ui';


export default class MissionsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      restaurants: [{
        "name": "Juin 2017",
        "address": "A saisir",
        "image": { "url": "http://foto.ericmeeuwsen.de/fotos/pas-de-calais/paysage/landschaft02.jpg" },
      }, {
        "name": "Mai 2017",
        "address": "A saisir",
        "image": { "url": "http://www.serialpictures.fr/wp-content/uploads/2012/05/Paysage-avec-des-coquelicots.jpg" },
      }, {
        "name": "Avril 2017",
        "address": "A saisir",
        "image": { "url": "http://www.ailleurs-est-ici.fr/vacances-cantal/IMG/jpg/Seycheuse_et_le_Peyre_Arseplatpetit.jpg" },
      }, {
        "name": "Mars 2017",
        "address": "10 jours / 6500 €",
        "image": { "url": "http://www.lejournaldujardin.com/wp-content/uploads/2013/11/hiver-decembre-300x225.jpg" },
      }, {
        "name": "February 2017",
        "address": "18 jours / 11 700 €",
        "image": { "url": "http://isoblitz.free.fr/wp-content/2010/03/Img_1553.jpg" },
      }, {
        "name": "January 2017",
        "address": "20 days / 13 000 €",
        "image": { "url": "https://c1.staticflickr.com/8/7059/7024438779_379592a0af_b.jpg" },
      }],
    }
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    const cellViews = rowData.map((restaurant, id) => {
    return (
        <TouchableOpacity key={id} styleName="flexible" onPress={this._goToScreen('missiondetail')}>
          <Card styleName="flexible">
            <Image
              styleName="medium-wide"
              source={{ uri: restaurant.image.url  }}
            />
            <View styleName="content">
              <Subtitle numberOfLines={3}>{restaurant.name}</Subtitle>
              <View styleName="horizontal">
                <Caption styleName="collapsible" numberOfLines={2}>{restaurant.address}</Caption>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
            );
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  static route = {
    navigationBar: {
      title: 'Missions',
    },
  };

  _goToScreen = name => () => {
    this.props.navigator.push(name);
  };

  render() {

    const groupedData = GridRow.groupByRows(this.state.restaurants, 3, () => {
          return 1;
          });

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Divider styleName="section-header">
				  <Caption>FINALCAD</Caption>
				  <Caption>650 € / jour</Caption>
				  <TouchableOpacity>
					  <Icon name="settings"/>
				  </TouchableOpacity>
				</Divider>
				<ListView style={{backgroundColor: '#E91E63'}}
				  data={groupedData}
				  renderRow={this.renderRow}
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

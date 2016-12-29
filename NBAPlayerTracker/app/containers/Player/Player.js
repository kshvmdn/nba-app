import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as c from '../../constants';
import ParallaxView from '../../components/ParallaxView';

export default class Player extends Component {
  constructor(props) {
    super(props);

    console.log(props.player);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.fetchPlayerData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleLinkPress(link) {
    Linking.canOpenURL(link)
      .then(supported => supported ? Linking.openURL(link) : null)
      .catch(err => console.error('Couldn\'t open URL.'))
  }

  fetchPlayerData() {
    let playerId = this.props.player.person_id;
    // TODO
  }

  render() {
    let { player } = this.props;
    let { player_info, headline_stats } = player;

    return (
      <View style={s.container}>
        <ParallaxView
          player={this.props.player}
          handleLinkPress={this.handleLinkPress.bind(this, `http://nba.com/players/${player_info.first_name}/${player_info.last_name}/${player.person_id}`)}>



        </ParallaxView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
import HeadlineStatsBox from '../../components/HeadlineStatsBox';
import GameLogBox from '../../components/GameLogBox';
import UpcomingGamesBox from '../../components/UpcomingGamesBox';
import NewsBox from '../../components/NewsBox';

export default class Player extends Component {
  constructor(props) {
    super(props);

    console.log(props.player);

    this.state = {
      errors: {}
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleLinkPress(link) {
    Linking.canOpenURL(link)
      .then(supported => supported ? Linking.openURL(link) : null)
      .catch(err => console.error('Couldn\'t open URL.'))
  }

  handleError(error, caller) {
    console.log(error)

    let { errors } = this.state;
    errors[caller] = error;

    this.setState({ errors });
  }

  render() {
    let { player } = this.props;
    let { player_info, headline_stats } = player;

    return (
      <View style={s.container}>
        <ParallaxView
          player={this.props.player}
          handleLinkPress={this.handleLinkPress.bind(
            this,
            `http://nba.com/players/${player_info.first_name}/${player_info.last_name}/${player.person_id}`
          )}>

          <View style={s.content}>

            <HeadlineStatsBox stats={headline_stats} />

            {!this.state.errors.GAMELOG && (
              <View style={s.contextBox}>
                <Text style={s.boxHeading}>Game Logs</Text>
                <GameLogBox player={this.props.player} handleError={this.handleError.bind(this)} />
              </View>
            )}

            {!this.state.errors.UPCOMING && (
              <View style={s.contentBox}>
                <Text style={s.boxHeading}>Upcoming Games</Text>
                <UpcomingGamesBox player={this.props.player} handleError={this.handleError.bind(this)} />
              </View>
            )}

            {!this.state.errors.NEWS && (
              <View style={s.contentBox}>
                <Text style={s.boxHeading}>News</Text>
                <NewsBox playerId={this.props.player.person_id} handleError={this.handleError.bind(this)} />
              </View>
            )}

          </View>
        </ParallaxView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  contentBox: {
  },
  boxHeading: {
    color: '#eee',
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    padding: 10,
    backgroundColor: '#333',
  },
});

import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import * as c from '../../constants';

export default class GameLogBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    let playerId = this.props.player.person_id;

    fetch(`http://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=00&PlayerID=${playerId}&Season=2016-17&SeasonType=Regular+Season`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => data['resultSets'][0])
    .then(data => {
      return data.rowSet.map(row => {
        let o = {};

        data.headers.forEach((header, i) => {
          o[header.toLowerCase()] = row[i];
        })

        return o;
      });
    })
    .then(data => this.setState({ data: data.slice(0, 15), loading: false }))
    .catch(err => this.setState({ data: [], loading: false }, () => this.props.handleError(err, 'GAMELOG')));
  }

  render() {
    let component;

    if (this.state.loading)
      return <View style={s.loadingBox}><ActivityIndicator color={'#1F6CB0'} /></View>;

    return (
      <ScrollView
        style={s.games}
        horizontal={true}
        pagingEnabled={true}>
        {this.state.data.map((game, i) => (
          <View style={s.game} key={i}>
            <View style={s.gameInfo}>
              <View style={s.meta}>
                <Text style={s.date}>{game.game_date}</Text>
                <Text style={s.matchup}>{game.matchup}</Text>
              </View>
              <Text style={s.wl}>{game.wl}</Text>
            </View>
            <View style={s.gameStats}>
                {['pts', 'reb', 'ast', 'stl', 'blk', 'tov', 'pf', 'min', 'fg_pct'].map((statKey, j) => (
                  <View key={`${i},${j}`} style={s.gameStat}>
                    <Text style={s.statsHeading}>{statKey.toUpperCase()}</Text>
                    <Text style={s.statsValue}>{game[statKey]}</Text>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>

    );
  }
}

const s = StyleSheet.create({
  loadingBox: {
    backgroundColor: '#eee',
    paddingVertical: 30,
  },
  games: {
    padding: 0,
  },
  game: {
    backgroundColor: '#eee',
    padding: 10,
    width: require('Dimensions').get('window').width,
  },
  gameInfo: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    flexDirection: 'column',
  },
  date: {
    fontSize: 13,
    marginRight: 30,
    color: '#222',
  },
  matchup: {
    fontSize: 18,
    marginRight: 30,
    color: '#1F6CB0',
  },
  wl: {
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'flex-start',
    fontSize: 18,
  },
  gameStats: {
    flexDirection: 'row',
  },
  gameStat: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsHeading: {
    fontSize: 13,
    color: '#777',
    fontFamily: 'sans-serif-light',
  },
  statsValue: {
    fontSize: 17,
    color: '#000'
  },
});

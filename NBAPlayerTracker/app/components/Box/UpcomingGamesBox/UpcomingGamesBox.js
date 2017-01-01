import React, { Component } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import LoadingBox from '../LoadingBox';
import * as c from '../../../constants';

export default class UpcomingGamesBox extends Component {
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

    fetch(`http://stats.nba.com/stats/playernextngames?LeagueID=00&NumberOfGames=15&PlayerID=${playerId}&Season=2016-17&SeasonType=Regular+Season`, {
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
    .then(data => {
      if (!data || data.length === 0)
        throw new Error('No data')

      return this.setState({ data, loading: false })
    })
    .catch(err => this.setState({ data: [], loading: false }, () => this.props.handleError(err, 'UPCOMING')));

  }

  render() {
    let component;

    if (this.state.loading)
      return <LoadingBox />

    return (
      <ScrollView style={s.games} horizontal={true}>
        {this.state.data.map((game, i) => (
          <View style={s.game} key={i}>
            <View style={s.teamsImages}>
              <Image
                style={s.teamLogo}
                source={{uri: `${c.ASSETS}/images/teams/${game.home_team_abbreviation}.png`}} />
              <Text style={s.vs}>VS</Text>
              <Image
                style={s.teamLogo}
                source={{uri: `${c.ASSETS}/images/teams/${game.visitor_team_abbreviation}.png`}} />
            </View>
            <Text style={s.teamsText}>{game.home_team_abbreviation} AT {game.visitor_team_abbreviation}</Text>
            <Text style={s.datetime}>{game.game_date} – {game.game_time[0] === '0' ? game.game_time.slice(1) : game.game_time} ET</Text>
          </View>
        ))}
      </ScrollView>

    );
  }
}

const s = StyleSheet.create({
  games: {
    padding: 0,
    marginHorizontal: -0.25,
  },
  game: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0.25,
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  teamsImages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  vs: {
    fontWeight: 'bold',
    color: '#777'
  },
  teamsText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  datetime: {
    fontSize: 15,
    fontFamily: 'sans-serif-light',
    color: '#333',
  },
});

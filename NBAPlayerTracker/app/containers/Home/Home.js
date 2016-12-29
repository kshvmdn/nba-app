import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import PlayerList from '../../components/PlayerList';
import Toolbar from '../../components/Toolbar';
import * as c from '../../constants';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerData: [],
      currentData: [],
      loading: true,
      filters: {
        teams: [],
        positions: [],
        search: '',
      },
    };
  }

  componentWillMount() {
    this.fetchPlayerData();
  }

  fetchPlayerData() {
    fetch(`${c.ASSETS}/data/players.json`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => data.sort((a, b) => (a.display_first_last > b.display_first_last) ? 1 : ((a.display_first_last < b.display_first_last) ? -1 : 0)))
    .then(data => this.setState({ currentData: data, playerData: data, loading: false }, this.filterData.bind(this)))
    .catch(err => this.setState({ currentData: data, playerData: data, loading: false }, () => console.error(err)))
  }

  filterData() {
    let { teams, positions, search } = this.state.filters;

    let currentData = JSON.parse(JSON.stringify(this.state.playerData))

    if (teams.length === 0 && positions.length === 0 && search.length === 0)
      return this.setState({ currentData })

    currentData = currentData.filter(player => {
      if (teams.length > 0 && !teams.includes(player.team_abbreviation))
        return false;

      if (positions.length > 0 && !positions.some(position => player.player_info.position.split('-').includes(position)))
        return false;

      if (search && search.length > 0) {
        if (player.display_first_last.toLowerCase().includes(search))
          return true;

        if (player.team_city.toLowerCase().includes(search))
          return true;

        if (player.team_name.toLowerCase().includes(search))
          return true;

        if (player.player_info.position.toLowerCase().includes(search))
          return true;

        if (String(player.player_info.from_year).toLowerCase().includes(search))
          return true;

        // Search query is non-null/non-empty, but no match.
        return false;
      }

      // No search query and we haven't returned yet -> match!
      return true;
    })

    this.setState({ currentData })
  }

  updateTeamFilter(teams) {
    let filters = { ...this.state.filters, teams }
    this.setState({ filters }, this.filterData.bind(this));
  }

  updatePositionFilter(positions) {
    let filters = { ...this.state.filters, positions }
    this.setState({ filters }, this.filterData.bind(this));
  }

  updateSearchFilter(event) {
    event.persist();
    let searchText = event.nativeEvent.text.toLowerCase().trim();

    if (searchText === this.state.filters.search)
      return;

    let filters = { ...this.state.filters, search: searchText };
    this.setState({ filters }, this.filterData.bind(this));
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1}}>
          <Spinner visible={true} size={'large'} color={'#1F6CB0'} overlayColor={'#efefef'} />
        </View>
      );
    }

    let component;

    if (this.state.currentData.length === 0) {
      component = <View style={s.noResults}><Text style={s.noResultsText}>No players found.</Text></View>;
    } else {
      component = (
        <View style={s.list}>
          <PlayerList data={this.state.currentData} />
        </View>
      );
    }

    return (
      <View style={s.container}>
        <StatusBar />
        <Toolbar />
        <TextInput
          onChange={this.updateSearchFilter.bind(this)}
          placeholder={'Search'}
          style={s.searchBar}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          clearButtonMode={'while-editing'}
          value={this.state.searchText} />
        <View style={s.filter}>
          <TouchableOpacity
            style={[s.filterContainer, s.filterContainerLeft]}
            onPress={() => Actions.filterPage({ optionType: 'Teams', update: this.updateTeamFilter.bind(this), selected: this.state.filters.teams })}>
            <Text style={s.filterText}>TEAM{this.state.filters.teams.length > 0 && ` (${this.state.filters.teams.length})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.filterContainer, s.filterContainerRight]}
            onPress={() => Actions.filterPage({ optionType: 'Positions', update: this.updatePositionFilter.bind(this), selected: this.state.filters.positions })}>
            <Text style={s.filterText}>POSITION{this.state.filters.positions.length > 0 && ` (${this.state.filters.positions.length})`}</Text>
          </TouchableOpacity>
        </View>
        {component}
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  searchBar: {
    backgroundColor: 'transparent',
    padding: 5,
    paddingLeft: 15,
    color: '#000',
    height: 50,
    fontFamily: 'sans-serif-light',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterContainer: {
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 1,
    paddingVertical: 12.5,
  },
  filterContainerLeft: {
    borderRightWidth: 0.25,
  },
  filterContainerRight: {
    borderLeftWidth: 0.25,
  },
  filterText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  noResults: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  noResultsText: {
    fontFamily: 'sans-serif-condensed',
    color: '#000',
  },
  list: {
    flex: 1,
  },
});
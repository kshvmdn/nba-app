import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Switch from 'react-native-material-switch';

import Toolbar from '../../components/Toolbar';

export default class Leaders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 'daily',
      dailyLeaders: [],
      dailyLoading: true,
      seasonLeaders: [],
      seasonLoading: true,
    };
  }

  componentWillMount() {
    this.fetchData('daily');
    this.fetchData('season');
  }

  fetchData(t) {
    fetch(`http://stats.nba.com/js/data/widgets/home_${t}.json`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => data.items.filter(item => /player/.test(item.uid))[0])
    .then(data => this.setState({ [`${t}Leaders`]: data, [`${t}Loading`]: false }))
    .catch(err => {
      console.log(err)
      this.setState({ [`${t}Leaders`]: [], [`${t}Loading`]: false, error: err })
    });
  }

  handlePress(playerId) {
    if (!(this.props.players && playerId))
      return;

    let currentPlayer;

    for (let player of this.props.players) {
      if (player.person_id === playerId)
        return Actions.playerCard({ player: currentPlayer })
    }
  }

  formatDatetime(datetime) {
    let d = new Date(datetime);
    return `${d.toDateString()}, ${d.toLocaleString().split(' ').splice(1).join(' ')}`;
  }

  render() {
    let { current } = this.state;
    let leaders = this.state[`${current}Leaders`];
    let loading = this.state[`${current}Loading`];

    let component;

    if (loading)
      component = <View style={s.loadingContainer}><ActivityIndicator color={'#1F6CB0'} size={'large'} /></View>
    else {
      component = (
        <ScrollView style={s.content}>
          {leaders.items.map((item, i) => (
            <View key={i} style={s.category}>
              <Text style={s.categoryHeading}>{item.title}</Text>
              <ScrollView
                horizontal={true}
                style={s.listItems}>
                {item.playerstats.map((player, j) => (
                  <TouchableOpacity key={`${i}, ${j}`} onPress={this.handlePress.bind(this, player.PLAYER_ID)}>
                    <View style={s.listItem}>
                      <View style={s.listItemTop}>
                        <Image
                          style={s.listItemHeadshot}
                          source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.PLAYER_ID}.png`}} />
                      </View>
                      <View style={s.listItemBottom}>
                        <View style={s.listItemBottomLeft}>
                          <Text style={s.listItemValue}>{player[item.name]}</Text>
                        </View>
                        <View style={s.listItemBottomRight}>
                          <Text style={s.listItemPlayerName}>{player.PLAYER_NAME}</Text>
                          <Text style={s.listItemPlayerTeam}>{player.TEAM_ABBREVIATION}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      );
    }

    return (
      <View style={s.container}>
        <Toolbar
          onIconClicked={Actions.pop.bind(this)}
          navIconName={'arrow-back'}
          subtitle={'League Leaders'} />

        <View style={s.switch}>
          <Text style={[s.switchText, this.state.current === 'season' && { color: '#222' }]}>Season</Text>
          <Switch
            style={s.switchControl}
            active={this.state.current === 'daily'}
            onChangeState={state => this.setState({ current: state ? 'daily' : 'season' })}
            activeButtonColor={'#1F6CB0'}
            activeButtonPressedColor={'#1A67AB'}
            activeBackgroundColor={'rgba(31, 108, 176, 0.6)'}
            inactiveButtonColor={'#969696'}
            inactiveButtonPressedColor={'#919191'}
            inactiveBackgroundColor={'rgba(150, 150, 150, 0.6)'} />
          <Text style={[s.switchText, this.state.current === 'daily' && { color: '#222' }]}>Day</Text>
        </View>

        {component}

        {leaders.last_updated && (
          <View style={s.lastUpdated}>
            <Text style={s.lastUpdatedText}>Last updated {this.formatDatetime(leaders.last_updated)}.</Text>
          </View>
        )}
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  loadingContainer: {
    padding: 40,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
  },
  switchText: {
    color: '#777',
    fontFamily: 'sans-serif-condensed',
    fontSize: 15,
  },
  switchControl: {
    marginRight: 2,
  },
  lastUpdated: {
    padding: 10,
    backgroundColor: '#fff',
  },
  lastUpdatedText: {
    fontFamily: 'sans-serif-condensed',
    color: '#777',
    fontSize: 12,
  },
  content: {
    paddingVertical: 10,
  },
  category: {
    marginBottom: 10,
  },
  categoryHeading: {
    fontFamily: 'sans-serif-medium',
    color: '#1F6CB0',
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 5,
  },
  listItems: {
    marginHorizontal: 4,
    marginBottom: 10,
  },
  listItem: {
    marginHorizontal: 2.5,
    width: 150,
    height: 140,
    backgroundColor: '#fff',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemTop: {
    paddingVertical: 5,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // backgroundColor: 'purple',
  },
  listItemBottomLeft: {
    flex: 0.5,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  listItemBottomRight: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'column',
    paddingHorizontal: 2,
  },
  listItemHeadshot: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  listItemValue: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'sans-serif-light',
  },
  listItemPlayerName: {
    fontSize: 15,
    color: '#333',
  },
  listItemPlayerTeam: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'sans-serif-light',
  },
});

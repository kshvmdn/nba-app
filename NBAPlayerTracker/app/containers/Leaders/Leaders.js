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

    for (let player of this.props.players) {
      if (player.person_id === playerId)
        return Actions.playerCard({ player })
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

    if (this.state.error)
      component = <View style={s.loadingContainer}><Text style={{ padding: 20, color: '#333', fontSize: 32 }}>Couldn&#39;t load data, try again later.</Text></View>
    else if (loading)
      component = <View style={s.loadingContainer}><ActivityIndicator color={'#1F6CB0'} size={'large'} /></View>
    else {
      component = (
        <ScrollView style={s.content}>
          {leaders.items.map((item, i) => (
            <View key={i} style={[s.category, (i === 0) && { marginTop: 0 }, ( i === leaders.items.length -1 ) && { marginBottom: 20 }]}>
              <Text style={s.categoryHeading}>{item.title}</Text>
              <ScrollView
                horizontal={true}
                style={s.listItems}>
                {item.playerstats.map((player, j) => (
                  <TouchableOpacity key={`${i}, ${j}`} onPress={this.handlePress.bind(this, player.PLAYER_ID)}>
                    <View style={[s.listItem, (j === 0) && { marginLeft: 0 }, (j === item.playerstats.length - 1) && { marginRight: 0 } ]}>
                      <View style={s.listItemTop}>
                        <Image
                          style={s.listItemHeadshot}
                          source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.PLAYER_ID}.png`}} />
                      </View>
                      <View style={s.listItemBottom}>
                        <View style={s.listItemBottomLeft}>
                          <Text style={s.listItemPlayerName}>{player.PLAYER_NAME}</Text>
                          <Text style={s.listItemPlayerTeam}>{player.TEAM_ABBREVIATION}</Text>
                        </View>
                        <View style={s.listItemBottomRight}>
                          <Text style={s.listItemValue}>{player[item.name]}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#f0f0f0',
  },
  lastUpdatedText: {
    fontFamily: 'sans-serif-condensed',
    color: '#222',
    fontSize: 12,
  },
  content: {
    paddingVertical: 10,
  },
  category: {
    marginVertical: 10,
  },
  categoryHeading: {
    fontFamily: 'sans-serif-medium',
    color: '#1F6CB0',
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 5,
  },
  listItems: {
    marginHorizontal: 15,
  },
  listItem: {
    marginHorizontal: 1.5,
    width: ((require('Dimensions').get('window').width / 2) - 16.5),
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listItemTop: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  listItemBottomLeft: {
    flexDirection: 'column',
    paddingLeft: 12.5,
  },
  listItemBottomRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12.5,
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
    textAlign: 'right',
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

import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as c from '../../constants'

export default class PlayerList extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      data: props.data,
      ds: ds.cloneWithRows(props.data),
      searchText: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data,
        ds: this.state.ds.cloneWithRows(nextProps.data)
      });
    }
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    return (
      <TouchableHighlight
        onPress={() => Actions.playerCard({ player: rowData })}
        underlayColor={'#fff'}>
        <View style={s.row}>
          <Image
            style={[s.rowImage, s.playerHeadshot]}
            source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${rowData.person_id}.png`}} />
          <View style={s.playerInfo}>
            <View style={s.playerName}>
              <Text style={s.playerNameText}>{rowData.display_first_last}</Text>
            </View>
            <View style={s.playerMeta}>
              <Text style={s.playerMetaText}>{rowData.team_abbreviation}</Text>
              <Text style={s.playerMetaTextDivider}>|</Text>
              <Text style={s.playerMetaText}>#{rowData.player_info.jersey}</Text>
              <Text style={s.playerMetaTextDivider}>|</Text>
              <Text style={s.playerMetaText}>{rowData.player_info.position.split('-').map(s => s[0]).join('-')}</Text>
            </View>
          </View>
          <View style={s.logoContainer}>
            <Image
              style={[s.rowImage, s.playerTeamLogo]}
              source={{uri: `${c.ASSETS}/images/teams/${rowData.team_abbreviation}.png`}} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionId}-${rowId}`}
        style={{
          height: StyleSheet.hairlineWidth + (adjacentRowHighlighted ? 0.25 : 0),
          backgroundColor: adjacentRowHighlighted ? '#1F6CB0' : 'rgba(0, 0, 0, 0.1)',
        }} />
    );
  }

  render() {
    return (
      <View style={s.container}>
        <ListView
          dataSource={this.state.ds}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          style={s.listView} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  rowImage: {
    height: 35,
    width: 35,
  },
  playerHeadshot: {
    borderRadius: 100,
    marginRight: 15,
  },
  playerInfo: {
    flexDirection: 'column',
  },
  playerNameText: {
    color: '#1F6CB0',
  },
  playerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerMetaText: {
    fontSize: 13,
    color: '#777',
  },
  playerMetaTextDivider: {
    marginHorizontal: 6,
    fontSize: 18,
    color: '#666',
    fontFamily: 'sans-serif-light',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

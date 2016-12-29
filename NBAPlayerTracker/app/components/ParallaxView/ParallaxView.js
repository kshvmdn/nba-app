import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as c from '../../constants';

export default class ParallaxView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { player } = this.props;

    return (
      <ParallaxScrollView
        backgroundColor={'#063968'}
        contentBackgroundColor={'#fff'}
        parallaxHeaderHeight={157.5}
        stickyHeaderHeight={60}
        renderStickyHeader={() => (
          <View style={s.header}>
            <TouchableOpacity style={s.headerTouchable} onPress={Actions.pop.bind(this)}>
              <Icon name='arrow-back' size={25} color={'#eee'}/>
            </TouchableOpacity>
            <Text style={s.headerName}>{player.display_first_last}</Text>
            <Image
              style={s.headerImage}
              source={{uri: `${c.ASSETS}/images/teams/${player.team_abbreviation}.png`}} />
          </View>
        )}
        renderForeground={() => (
          <View style={s.fg}>
            <View style={s.fgLeft}>
              <Image
                style={s.headshot}
                source={{uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.person_id}.png`}} />
            </View>
            <View style={s.fgRight}>
              <View style={s.fgRightTop}>
                <View style={s.playerInfo}>
                  <Text style={s.playerNameText}>{player.display_first_last}</Text>
                  <View style={s.playerMeta}>
                    <Text style={s.playerMetaText}>{player.team_abbreviation}</Text>
                    <Text style={s.playerMetaTextDivider}>|</Text>
                    <Text style={s.playerMetaText}>#{player.player_info.jersey}</Text>
                    <Text style={s.playerMetaTextDivider}>|</Text>
                    <Text style={s.playerMetaText}>{player.player_info.position.split('-').map(s => s[0]).join('-')}</Text>
                  </View>
                </View>
                <View style={s.teamLogo}>
                  <Image
                    style={s.teamLogoImage}
                    source={{uri: `${c.ASSETS}/images/teams/${player.team_abbreviation}.png`}} />
                </View>
              </View>
              <View style={s.fgRightBottom}>
                <View style={s.link}>
                  <TouchableOpacity
                    onPress={this.props.handleLinkPress}>
                    <Text style={s.linkText}>View on NBA.com</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}>
        {this.props.children}
      </ParallaxScrollView>
    );
  }
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerName: {
    color: '#eee',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
  headerImage: {
    height: 25,
    width: 25,
  },

  fg: {
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#777',
  },
  fgLeft: {
    alignItems: 'center',
  },
  headshot: {
    width: 195,
    height: 142.5,
  },
  fgRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fgRightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fgRightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerInfo: {
    padding: 5,
  },
  playerNameText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerMetaText: {
    fontSize: 13,
    color: '#ddd',
  },
  playerMetaTextDivider: {
    marginHorizontal: 6,
    fontSize: 18,
    color: '#eee',
    marginBottom: 2,
    fontFamily: 'sans-serif-light',
  },
  teamLogo: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  teamLogoImage: {
    height: 50,
    width: 50,
  },
  link: {
    padding: 10,
  },
  linkText: {
    fontSize: 11,
    color: '#eee',
    borderRadius: 50,
    borderColor: '#eee',
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
});

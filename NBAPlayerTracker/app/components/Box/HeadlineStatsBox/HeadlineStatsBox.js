import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HeadlineStatsBox(props) {
  let { stats } = props;

  return (
    <View style={s.headlines}>
      <View style={s.headline}>
        <Text style={s.heading}>PPG</Text>
        <Text style={s.stat}>{stats.pts}</Text>
      </View>
      <View style={s.headline}>
        <Text style={s.heading}>RPG</Text>
        <Text style={s.stat}>{stats.reb}</Text>
      </View>
      <View style={s.headline}>
        <Text style={s.heading}>APG</Text>
        <Text style={s.stat}>{stats.ast}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  headlines: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70,
  },
  headline: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderWidth: 0,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#000',
    fontFamily: 'sans-serif-light',
    fontSize: 15,
  },
  stat: {
    color: '#1F6CB0',
    fontSize: 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
})

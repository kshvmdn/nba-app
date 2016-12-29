import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class NewsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  formatDate(date) {
    let d = new Date(date);
    return `${d.toDateString()}, ${date.split(' ').splice(1).join(' ')}`;
  }

  fetchData() {
    let { playerId } = this.props;

    fetch(`http://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?playerId=${playerId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(news => news['PlayerRotowires'])
    .then(data => this.setState({ data: data.slice(0, 3), loading: false }))
    .catch(err => this.setState({ data: [], loading: false }, () => this.props.handleError(err, 'NEWS')));
  }

  render() {
    let component;

    if (this.state.loading)
      return <View style={s.loadingBox}><ActivityIndicator color={'#1F6CB0'} /></View>;

    return (
      <View style={s.entries}>
        {this.state.data.map((entry, i) => (
          <View key={i} style={s.entry}>
            <Text style={s.caption}>{entry.ListItemCaption}</Text>
            <Text style={s.date}>{this.formatDate(entry.ListItemPubDate)}</Text>
            <Text style={s.description}>{entry.ListItemDescription}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const s = StyleSheet.create({
  loadingBox: {
    backgroundColor: '#eee',
    paddingVertical: 30,
  },
  entries: {
    marginVertical: -0.5,
  },
  entry: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 0.5,
  },
  caption: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
    lineHeight: 25,
    color: '#222',
  },
  date: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    marginVertical: 5,
    color: '#222',
  },
  description: {
    fontSize: 15,
    lineHeight: 25,
    color: '#222',
  },
});

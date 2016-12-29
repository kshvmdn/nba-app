import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  onActionSelected(idx) {
    this.props.actions[idx].fn()
  }

  render() {
    let actions = [];

    return (
      <Icon.ToolbarAndroid
        actions={this.props.actions || actions}
        onActionSelected={this.onActionSelected.bind(this)}
        style={s.toolbar}
        title={this.props.title || 'NBA Player Tracker'}
        subtitle={this.props.subtitle || ''}
        titleColor={'#fff'}
        subtitleColor={'#fff'} />
    );
  }
}

const s = StyleSheet.create({
  toolbar: {
    height: 60,
    backgroundColor: '#1F6CB0'
  }
})

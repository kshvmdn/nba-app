import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  onActionSelected(idx) {
    if (!this.props.actions || !this.props.actions.hasOwnProperty(idx))
      return;

    this.props.actions[idx].fn();
  }

  render() {
    return (
      <Icon.ToolbarAndroid
        onActionSelected={this.onActionSelected.bind(this)}
        style={s.toolbar}
        subtitleColor={'#f6f6f6'}
        title={this.props.title || 'NBA Player Tracker'}
        titleColor={'#fff'}
        {...this.props} />
    );
  }
}

const s = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#1F6CB0',
  },
})

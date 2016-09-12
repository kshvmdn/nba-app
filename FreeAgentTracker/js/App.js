import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import StatusBar from './components/AppStatusBar';
import Navigator from './AppNavigator';

export default class FreeAgentTracker extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

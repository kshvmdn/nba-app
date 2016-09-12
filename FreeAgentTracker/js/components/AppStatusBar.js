import React from 'react';
import {
  StatusBar,
  StyleSheet
} from 'react-native';

import colours from './../utils/colours';

export default function AppStatusBar () {
  return (
    <StatusBar style={styles.statusBar} />
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: colours.blue
  }
});

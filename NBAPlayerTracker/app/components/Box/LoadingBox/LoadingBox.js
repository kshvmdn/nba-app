import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const s = StyleSheet.create({
  loadingBox: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 30,
  },
});

export default function LoadingBox(props) {
  return (
    <View style={s.loadingBox}>
      <ActivityIndicator color={'#1F6CB0'} />
    </View>
  );
}

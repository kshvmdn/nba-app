import React, { Component } from 'react';
import {
  BackAndroid,
  Navigator,
  Platform,
  StatusBar,
  ToastAndroid,
  View
} from 'react-native';

import Main from './containers/Main';
// import Module from './containers/Module';
// import Result from './containers/Result';

export default class AppNavigator extends Component {
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton () {
    const navigator = this.navigator;

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  renderScene (route, navigator) {
    let scene;

    if (route.name) {
      switch(route.name) {
        case 'main':
          scene = <Main navigator={navigator} route={route} />;
          break;
        case 'result':
          scene = <Result navigator={navigator} route={route} />;
          break;
        default:
          break;
      }
    }

    if (!scene && route.url) {
      scene = <Module navigator={navigator} url={route.url} />;
    }

    return scene || <View />;
  }

  render () {
    return (
      <Navigator
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
        }}
        initialRoute={{name: 'main'}}
        ref={(navigator) => { this.navigator = navigator }}
        renderScene={this.renderScene}
      />
    );
  }
}

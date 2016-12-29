import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from './containers/Home';
import Player from './containers/Player';
import Filter from './containers/Filter';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="home" component={Home} initial={true} />
          <Scene key="playerCard" component={Player} />
          <Scene key="filterPage" component={Filter} />
        </Scene>
      </Router>
    )
  }
}

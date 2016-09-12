import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import getData from './../../actions/fetch';
import colours from './../../utils/colours';

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      data: []
    }
  }

  componentDidMount() {
    console.log('component did mount')
  }

  onLoadEnd () {
    this.setState({ loading: false });
  }

  onRefresh () {
    console.log('refresh')
  }

  render () {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          onActionSelected={() => this.onRefresh()}
          actions={[
            { title: 'Refresh', iconName: 'refresh', show: 'always' }
          ]}
          title={title}
          titleColor='#fff'
          style={styles.toolbar}
        />
      </View>
    );
  }
}

Main.defaultProps = {
  title: 'FreeAgentTracker'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 55,
    backgroundColor: colours.blue,
    justifyContent: 'center'
  }
});

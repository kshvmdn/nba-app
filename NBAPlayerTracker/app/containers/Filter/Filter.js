import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Toolbar from '../../components/Toolbar';
import * as c from '../../constants';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: this.props.selected };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected })
  }

  popAndSavedSelected() {
    this.props.update(this.state.selected);
    Actions.pop();
  }

  handleRowSelect(selection) {
    let { selected } = this.state;
    let index = selected.indexOf(selection);

    if (index === -1)
      return this.setState({ selected: [selection, ...selected] })

    selected.splice(index, 1)
    this.setState({ selected });
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    let selection = this.props.optionType === 'Teams'
      ? rowData.abbr
      : this.props.optionType === 'Positions'
        ? rowData.name
        : null;

    return (
      <TouchableHighlight onPress={this.handleRowSelect.bind(this, selection)}>
        <View style={s.row}>
          {this.props.optionType === 'Teams' && <Image
            style={s.rowImage}
            source={{uri: `${c.ASSETS}/images/teams/${rowData.abbr}.png`}} />}

          <Text style={s.rowText}>{rowData.name}</Text>

          {this.state.selected.includes(selection) && <View style={s.rowSelectedIndicator}>
            <Icon name='done' size={15} color={'#1F6CB0'} />
          </View>}
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionId}-${rowId}`}
        style={{
          height: StyleSheet.hairlineWidth + (adjacentRowHighlighted ? 0.25 : 0),
          backgroundColor: adjacentRowHighlighted ? '#1F6CB0' : 'rgba(0, 0, 0, 0.1)',
        }} />
    );
  }

  render() {
    let actions = [
      { title: 'Done', iconName: 'done-all', iconSize: 25, show: 'always', fn: this.popAndSavedSelected.bind(this) },
    ];

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let source = this.props.optionType === 'Teams'
      ? c.TEAMS
      : this.props.optionType === 'Positions'
        ? c.POSITIONS
        : null;

    return (
      <View style={s.container}>
        <Toolbar
          actions={actions}
          onIconClicked={Actions.pop.bind(this)}
          navIconName={'arrow-back'}
          subtitle={this.props.optionType} />
        <ListView
          dataSource={ds.cloneWithRows(source)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          style={s.listView} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  rowImage: {
    height: 35,
    width: 35,
    marginRight: 20,
  },
  rowText: {
    color: '#333',
    fontSize: 16,
  },
  rowSelectedIndicator: {
    flex: 1,
    alignItems: 'flex-end',
  }
});

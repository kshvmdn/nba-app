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

    this.state = {
      selectedTeams: this.props.selectedTeams || [],
      selectedPositions: this.props.selectedPositions || []
    };
  }

  popAndSavedSelected() {
    let selected = this.props.optionType === 'Teams'
      ? this.state.selectedTeams
      : this.state.selectedPositions;

    this.props.update(selected);
    Actions.pop();
  }

  handleRowSelect(selection) {
    let selected = this.props.optionType === 'Teams'
      ? this.state.selectedTeams
      : this.state.selectedPositions;
    let key = `selected${this.props.optionType}`
    let index = selected.indexOf(selection);

    if (index === -1)
      return this.setState({ [key]: [selection, ...selected] })

    selected.splice(index, 1)
    this.setState({ [key]: selected }, () => console.log(this.state))
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    let selection, selected;

    if (this.props.optionType === 'Teams') {
      selection = rowData.abbr;
      selected = this.state.selectedTeams;
    } else if (this.props.optionType === 'Positions') {
      selection = rowData.name;
      selected = this.state.selectedPositions;
    }

    return (
      <TouchableHighlight onPress={() => this.handleRowSelect(selection)}>
        <View style={s.row}>
          {this.props.optionType === 'Teams' && <Image
            style={s.rowImage}
            source={{uri: `${c.ASSETS}/images/teams/${rowData.abbr}.png`}} />}

          <Text style={s.rowText}>{rowData.name}</Text>

          {selected.includes(selection) && <View style={s.rowSelectedIndicator}>
            <Icon name="done" size={15} color={'#1F6CB0'} />
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
      : c.POSITIONS;

    return (
      <View style={s.container}>
        <Toolbar subtitle={this.props.optionType} actions={actions} />
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
  },
  rowSelectedIndicator: {
    flex: 1,
    alignItems: 'flex-end',
  }
});

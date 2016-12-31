import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
  }

  onClose() {
    this._textInput.setNativeProps({ text: '' });
    this.props.onSearchChange({ nativeEvent: { text: '' } });
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
    this.dismissKeyboard();
  }

  dismissKeyboard() {
    dismissKeyboard();
  }

  render() {
    return (
      <View onStartShouldSetResponder={this.dismissKeyboard.bind(this)}>
        <View style={s.searchBar}>

          {this.state.isFocused ? (
            <TouchableOpacity onPress={this.dismissKeyboard.bind(this)}>
              <Icon name={'arrow-back'} size={20} color={'#737373'} />
            </TouchableOpacity>
          ) : <Icon name={'search'} size={20} color={'#737373'} />}

          <TextInput
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.props.onSearchChange}
            placeholder={'Search'}
            ref={c => (this._textInput = c)}
            returnKeyType={'search'}
            style={s.searchBarInput}
            underlineColorAndroid={'transparent'} />

          {this.state.isFocused && (
            <TouchableOpacity onPress={this.onClose.bind(this)}>
              <Icon style={{ paddingRight: 10 }} name={'close'} size={20} color={'#737373'} />
            </TouchableOpacity>
          )}

        </View>

        {/*<TextInput
          autoCapitalize={'characters'}
          onChange={this.updateSearchFilter.bind(this)}
          placeholder={'Search'}
          style={s.searchBar}
          underlineColorAndroid={'transparent'}
          value={this.state.searchText} />*/}
      </View>
    );
  }
}

const s = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingLeft: 10,
    height: 50,
  },
  searchBarInput: {
    flex: 1,
    fontFamily: 'sans-serif-light',
    backgroundColor: 'transparent',
    color: '#444',
    paddingLeft: 15,
    fontSize: 16,
  },
})

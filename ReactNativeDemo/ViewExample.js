import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text } from 'react-native';

export default class ViewExample extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
      />
    );
  }
}
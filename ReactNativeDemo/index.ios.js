/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  Text,
  AppRegistry,
} from 'react-native';

export default class ReactNativeDemo extends Component {
  render() {
    return (
      <Text>Hello World!</Text>
    );
  }
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);

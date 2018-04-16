/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  View,
} from 'react-native';

export default class ReactNativeDemo extends Component {
  render() {
    return (
      //在render函数中引用this.props
      <View style={{alignItems: 'center'}}>
        <Greeting name='jack' />
        <Greeting name='roser' />
      </View>
    );
  }
}

//通过在不同的场景使用不同的属性定制，可以尽量提高自定义组件的复用范畴
class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text> 
    );
  }
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);

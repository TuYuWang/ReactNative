/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

export default class ReactNativeDemo123 extends Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class ReactNativeDemo456 extends Component {
  render() {
    return (
      //使用flex:1来指定某个组件扩张以撑满所有剩余的空间
      //有多个并列的子组件使用了flex:1，则这些子组件会平分父容器中剩余的空间
      //flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大
      <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo456);

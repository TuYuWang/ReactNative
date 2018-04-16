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

export default class ReactNativeDemoFlexDirection extends Component {
  render() {
    return (
      //flexDirection可以决定布局的主轴。子元素水平轴(row)方向排列，沿着竖直轴(column)方向排列
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class ReactNativeDemoJustifyContent extends Component {
  render() {
    return (
      //justifyContent可以决定其子元素沿着主轴的排列方式
      //flex-start、center、flex-end、space-around以及space-between。
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class ReactNativeDemoAlignItems extends Component {
  render() {
    return (
      //alignItems决定与主轴垂直的轴的排列方式
      //flex-start、center、flex-end以及stretch
      //stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸。
      //以下面的代码为例：只有将子元素样式中的width: 50去掉之后，alignItems: 'stretch'才能生效
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{ height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{ height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemoAlignItems);

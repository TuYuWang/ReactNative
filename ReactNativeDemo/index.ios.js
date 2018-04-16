/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

export default class ReactNativeDemo extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}

class Blink extends Component {

  //构造函数, 需要改变的数据，我们需要使用state。
  constructor(props) {
    super(props);
  
    this.state = { showText: true };

    //每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState( previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    //根据当前showText的值决定是否显示text内容
    let dispaly = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{dispaly}</Text>      
    );
  }
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  AppRegistry,
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ReactNativeDemoTextInput extends Component {
  constructor(props) {
    super(props);
  
    this.state = { text: 'Useless Placholder' };
  }
  render() {
    return (
      //TextInput订阅它的onChangeText事件来读取用户的输入
      //在onChangeText中用setState把用户的输入写入到state中
      <TextInput 
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}


//有些属性仅在multiline为true或者为false的时候有效
//当multiline=false时，为元素的某一个边添加边框样式
//例如：borderBottomColor，borderLeftWidth等）将不会生效
//貌似没有改颜色的效果
class ReactNativeDemoTextInputMultiline extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      text: 'Useless Multiline Placholder',
    };
  }

  //输入颜色，view背景改变
  render() {
    return (
      <View style={{
        backgroundColor: this.state.text,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
        <UselessTextInput 
          multiline = {true}
          numberOfLines = {4}
          style={{height: 200}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput 
      //将父组件传递来的所有props传递给TextInput，类似继承
        {...this.props}
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

//例子
class WithLabel extends Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

//输入事件监听
class TextEventsExample extends Component {
  state = {
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
    prev3Text: '<No Event>',
  }

  updateText = (text) => {
    this.setState((state) => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text,
      };
    });
  }

  render() {
    return (
      <View style={{height: 200}}>
        <TextInput 
          placeholder='Enter text to see events'
          autoCorrect={false}
          onFocus={() => this.updateText('onFocus')}
          onBlur={() => this.updateText('onBlur')}
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}
          onSelectionChange={(event) => this.updateText(
            'onSelectionChange range: ' +
            event.nativeEvent.selection.start + ',' +
            event.nativeEvent.selection.end
          )}
          onKeyPress={(event) => {
            this.updateText('onKeyPress key: ' + event.nativeEvent.key);
          }}
          style={styles.default}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}{'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text}){'\n'}
          (prev3: {this.state.prev3Text})
        </Text>
      </View>
    );
  }
}

//未完待续

//Styles
var styles = StyleSheet.create({
  page: {
    paddingBottom: 300,
  },
  default: {
    top: 200,
    height: 200,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    justifyContent: 'center',
    fontSize: 30,
    padding: 4,
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4,
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
  multilineChild: {
    width: 50,
    height: 40,
    position: 'absolute',
    right: 5,
    backgroundColor: 'red',
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2,
  },
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainder: {
    textAlign: 'right',
    width: 24,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('ReactNativeDemo', () => TextEventsExample);

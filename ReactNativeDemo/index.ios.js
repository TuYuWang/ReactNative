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
          //字符大写
          //characters: 所有的字符。
          //words: 每个单词的第一个字符。
          //sentences: 每句话的第一个字符（默认）。
          //none: 不自动切换任何字符为大写。
          autoCapitalize='words'

          //占位符
          placeholder='Enter text to see events'

          //拼写自动修正。默认为true
          autoCorrect={false}

          //当文本框获得焦点的时候调用此回调函数。
          onFocus={() => this.updateText('onFocus')}

          //当文本框失去焦点的时候调用此回调函数。
          onBlur={() => this.updateText('onBlur')}

          //当文本框内容变化时调用此回调函数。
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}

          //当文本输入结束后调用此回调函数
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}

          //此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用。
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}

          //长按选择文本时，选择范围变化时调用此函数，传回参数的格式形如 { nativeEvent: { selection: { start, end } } }。
          onSelectionChange={(event) => this.updateText(
            'onSelectionChange range: ' +
            event.nativeEvent.selection.start + ',' +
            event.nativeEvent.selection.end
          )}

          //当一个键被按下的时候调用此回调。传递给回调函数的参数为{ nativeEvent: { key: keyValue } }，其中keyValue即为被按下的键。会在onChange之前调用。
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

//自动扩展(没看出效果)
class AutoExpandingTextInput extends Component {
  state: any;

  constructor(props) {
    super(props);
  
    this.state = {
      text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0,
    };
  }
  render() {
    return (
      <TextInput 
        {...this.props}
        //如果为true，文本框中可以输入多行文字。默认值为false。
        multiline={true}
        onChangeText={(text) => {
          this.setState({text});
        }}
        onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
        />
    );
  }
}

//限制输入长度
class RewriteExample extends Component {

  constructor(props) {
    super(props);
  
    this.state = {text: ''};
  }

  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';

    return (
      <View style={styles.rewriteContainer}>
        <TextInput 
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            text = text.replace(/ /g, '_');
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
        {remainder}
        </Text>
      </View>
    );
  }
}

//匹配字符，校验
class RewiriteExampleinvalidCharacters extends Component {
  constructor(props) {
    super(props);
  
    this.state = { text: '' };
  }
  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput 
          multiline={false}
          onChangeText={(text) => {
            //正则表达式匹配字符串，其中"/ /"这个是固定写法，"\s"是转移符号用以匹配任何空白字符，包括空格、制表符、换页符等等，"g"表示全局匹配将替换所有匹配的子串，如果不加"g"当匹配到第一个后就结束了。
            this.setState({text: text.replace(/\s/g, '')});
          }}
          style={styles.default}
          value={this.state.text}
        />
      </View>
    );
  }
}

//标记内容(#后面的字体变蓝)
class TokenizedTextExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = {text: 'Hello #World'};
  }
  render() {

    let delimiter = /\s+/;

    let _text = this.state.text;
    let token, index, parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token == null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>;
      } else {
        return text;
      }
    });
    return(
      <View style={{height: 50, top: 50}}>
        <TextInput
          multiline= {true}
          style={styles.multiline}
          onChangeText={(text) => {
            this.setState({text});
          }}>
          <Text>{parts}</Text>
         </TextInput>
      </View>
    );
  }
}

//键盘return键类型和事件
class BlurOnSubmitExample extends Component {
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  }
  render() {
    return (
      <View style={{top: 30, height:200}}>
        <TextInput 
          ref='1'
          style={styles.default}
          placeholder='blurOnSubmit = flase'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput 
          ref='2'
          style={styles.default}
          keyboardType='email-address'
          placeholder='blurOnSubmit = false'
          returnKeyType='next'
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput 
          ref='3'
          style={styles.default}
          keyboardType='url'
          placeholder='blurOnSubmit = false'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput 
          ref='4'
          style={styles.default}
          keyboardType='numeric'
          placeholder='blurOnSubmit = false'
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('1')}
        />
        <TextInput 
          ref='5'
          style={styles.default}
          keyboardType='numbers-and-punctuation'
          placeholder='blurOnSubmit = true'
          returnKeyType='done'
        />
      </View>
    );
  }
}

//抱this错误，未成功运行
type SelectionExampleState = {
  selection: {
    start: number;
    end?: number;
  };
  value: string;
}

class SelectionExample extends Component {
  state: SelectionExampleState;

  _textInput: any;

  constructor(props) {
    super(props);
  
    this.state = {
      selection: {start: 0, end: 0},
      value: props.value,
      length: 10,
    };
  }

  onSelectionChange({nativeEvent: {selection}}) {
    this.setState({selection});
  }

  getRandomPosition() {
    var length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select(start, end) {
    this._textInput.focus();
    this.setState({selection: {start, end}});
  }

  selectRandom() {
    var positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions);
  }

  placeAt(position) {
    this.select(position, position);
  }

  placeAtRandom() {
    this.placeAt(this.getRandomPosition());
  }

  render() {
    //会报错，只能用固定值替代
    // var length = this.state.value.length;
    var length = this.state.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={(value) => this.setState({value})}
          onSelectionChange={this.onSelectionChange.bind(this)}
          ref={textInput => (this._textInput = textInput)}
          selection={this.state.selection}
          style={this.props.style}
          value={this.state.value}
        />
      
        <View>
          <Text>
            selection = {JSON.stringify(this.state.selection)}
          </Text>
          <Text onPress={this.placeAt.bind(this, 0)}>
            Place  at Start (0, 0)
          </Text>
          <Text onPress={this.placeAt.bind(this, length)}>
             Place at End ({length}, {length})
          </Text>
          <Text onPress={this.placeAtRandom.bind(this)}>
            Place at Random
          </Text>
         <Text onPress={this.select.bind(this, 0, length)}>
            Select All
          </Text>
          <Text onPress={this.selectRandom.bind(this)}>
            Select Random
          </Text>
        </View>
      </View>
    );  
  }
}

//完整例子
exports.displayName = (undefined: ?string);
exports.title = '<TextInput>';
exports.description = 'Single and multi-line text inputs';
exports.examples = [
  {
    title: 'Auto-focus',
    render: function() {
      return (
        <TextInput 
          autoFocus={true}
          style={styles.default}
          accessibilityLabel='I am the accessibility label for text input'
        />
      );
    } 
  },
  {
    title: "Live Re-write (<sp> -> '_') + maxLength",
    render: function() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Live Re-write (no spaces allowed)',
    render: function() {
      return <RewriteExampleInalidCharacters />; 
    }
  },
  {
    title: 'Auto-capitalize',
    render: function() {
      return (
        <View>
          <WithLabel label='none'>
            <TextInput 
              autoCapitalize='none'
              style={style.default}
            />
          </WithLabel>
          <WithLabel label='sentences'>
            <TextInput 
              autoCapitalize='sentences'
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label='words'>
            <TextInput 
              autoCapitalize='words'
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label='characters'>
            <TextInput 
              autoCapitalize='characters'
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Auto-correct',
    render: function() {
      return (
        <View>
          <WithLabel label='true'>
            <TextInput autoCapitalize={true} style={styles.default} />
          </WithLabel>
          <WithLabel label='false'>
            <TextInput autoCapitalize={false} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Keyboard types',
    render: function() {
      var keyboardTypes = [
        'default',
        'ascii-capable',
        'numbers-and-punctuation',
        'url',
        'number-pad',
        'phone-pad',
        'name-phone-pad',
        'email-address',
        'decimal-pad',
        'twitter',
        'web-search',
        'numeric'
      ];
      var examples = keyboardTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput 
              keyboardType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>
    }
  },
  {
    title: 'Keyboard appearance',
    render: function() {
      var keyboardAppearance = [
        'default',
        'light',
        'dark',
      ];
      var examples = keyboardAppearance.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput 
              keyboardAppearance={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Return key types',
    render: function() {
      var retrunKeyTypes = [
        'default',
        'go',
        'google',
        'join',
        'next',
        'route',
        'search',
        'send',
        'yahoo',
        'done',
        'emergency-call',
      ];
      var examples = returnKeyTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput 
              returnKeyType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>
    }
  },
  {
    title: 'Enable return key automatically',
    render: function() {
      return (
        <View>
          <WithLabel label='true'>
            <TextInput enablesReturnKeyAutomatically={true} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Secure text entry',
    render: function() {
      return (
        <View>
          <WithLabel label='true'>
            <TextInput secureTextEntry={true} style={styles.default} defaultValue='abc' />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Event handing',
    render: function(): React.Elemet<any> { return <TextEventsExample />;}
  },
  {
    title: 'Colored input text',
    render: function() {
      return (
        <View>
          <TextInput 
            style={[styles.default, {color: 'blue'}]}
            defaultValue='Blue'
          />
          <TextInput 
            style={[styles.default, {color: 'green'}]}
            defaultValue='Green'
          />
        </View>
      );
    }
  },
  {
    title: 'Colored highlight/Cursor for text input',
    render: function() {
      return (
        <View>
          <TextInput 
            style={styles.default}
            selectionColor={'green'}
            defaultValue='highlight me'
          />
          <TextInput 
            style={styles.default}
            selectionColor={'rgba(86, 76, 205, 1)'}
            defaultValue='highlight me'
          />
        </View>
      );
    }
  },
  {
    title: 'Clear button mode',
    render: function() {
      return (
        <View>
          <WithLabel label='never'>
            <TextInput 
              style={styles.default}
              clearButtonMode='never'
            />
          </WithLabel>
          <WithLabel label='while editing'>
            <TextInput 
              style={styles.default}
              clearButtonMode='while-editing'
            />
          </WithLabel>
          <WithLabel label='unless editing'>
            <TextInput 
              style={styles.default}
              clearButtonMode='unless-editing'
            />
          </WithLabel>
          <WithLabel label='always'>
            <TextInput 
              style={styles.default}
              clearButtonMode='always'
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Clear and select',
    render: function() {
      return (
        <View>
          <WithLabel label='clearTextOnFocus'>
            <TextInput
              placeholder='text is cleared on focus'
              defaultValue='text is cleared on focus'
              style={styles.default}
              clearTextOnFocus={true}
            />
          </WithLabel>
          <WithLabel label='selectTextOnFocus'>
            <TextInput 
              placeholder='text is selected on focus'
              defaultValue='text is selected on focus'
              style={styles.default}
              selectTextOnFocus={true}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Blur on submit',
    render: function(): React.Elemet<any> { return <BlurOnSubmitExample />},
  },
  {
    title: 'Multiline blur on submit',
    render: function() {
      return (
        <View>
          <TextInput 
            style={styles.multiline}
            placeholder='blurOnSubmit = true'
            returnkeyType='next'
            blurOnSubmit={true}
            multiline={true}
            onSubmitEditing={event => alert(event.nativeEvent.text)}
          />
        </View>
      );
    }
  },
  {
    title: 'Multiline',
    render: function() {
      return (
        <View>
          <TextInput 
            placeholder='multiline text input'
            multiline={true}
            style={styles.multiline}
          />
          <TextInput 
            placeholder='multiline text input with font styles and placeholder'
            multiline={true}
            clearTextOnFocus={true}
            autoCorrect={true}
            autoCapitalize='words'
            placeholderTextColor='red'
            keyboardType='url'
            style={[styles.multiline, styles.multilineWithFontStyles]}
          />
          <TextInput 
            placeholder='multiline text input with max length'
            maxLength={5}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput 
            placeholder='uneditable multiline text input'
            editable={false}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput 
            defaultValue='uneditable multiline text input with phone number detection: 888888888.'
            editable={false}
            multiline={true}
            style={styles.multiline}
            dataDetectorTypes='phoneNumber'
          />
          <TextInput 
            placeholder='multiline with children'
            multiline={true}
            enablesReturnKeyAutomatically={true}
            returnKeyType='go'
            style={styles.multiline}>
            <View style={styles.multilineChild} />
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput 
            placeholder='height increases with content'
            enablesReturnKeyAutomatically={true}
            returnKeyType='default'
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput 
            placeholder='height increases with content'
            enablesReturnKeyAutomatically={true}
            returnKeyType='default'
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Text selection & cursor placement',
    render: function() {
      return (
        <View>
          <SelectionExample 
            style={styles.default}
            value='text selection can be changed'
          />
          <SelectionExample 
            style={styles.multiline}
            value={'multiline text selection\ncan also be changed'}
          />
        </View>
      );
    }
  },
  {
    title: 'TextInput maxLength',
    render: function() {
      return (
        <View>
          <WithLabel label='maxLength: 5'>
            <TextInput 
              maxLength={5}
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label='maxLength: 5 with placeholder'>
            <TextInput 
              maxLength={5}
              placeholder='ZIP code entry'
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label='maxLength: 5 with default value already set'>
            <TextInput 
              maxLength={5}
              defaultValue='94025'
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with very long default value already set">
            <TextInput
              maxLength={5}
              defaultValue="9402512345"
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  }
];

//Styles
var styles = StyleSheet.create({
  page: {
    paddingBottom: 300,
  },
  default: {
    top: 30,
    height: 200,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    justifyContent: 'center',
    fontSize: 20,
    padding: 4,
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    fontSize: 20,
    padding: 4,
    // marginBottom: 4,

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

AppRegistry.registerComponent('ReactNativeDemo', () => SelectionExample);

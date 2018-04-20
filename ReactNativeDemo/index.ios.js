/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  Text,
  AppRegistry,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

export default class ReactNativeDemo extends Component {

  constructor(props) {
    super(props);
  
    this.state = { isLoading: true };
  }

  componentDidMount(){
    return fetch('http://suggest.taobao.com/sug?code=utf-8&q=婴儿纸尿裤')
      .then(response => response.json()) 
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.result,

        }, function(){
          console.log(responseJson);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList 
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item[0]}, {item[1]}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);

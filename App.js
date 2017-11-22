import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as publicAPI from './api/bittrex/public'

export default class App extends React.Component {
  componentDidMount() {

    let promise = publicAPI.getOrderBook('btc-ltc', 'both');

    promise.then(response=>console.log(response))
     .catch((reason) => console.log(reason)) 
  
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

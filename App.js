import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import TestView from './views/TestView';
import Dashboard from './views/Dashboard.js'


export default class App extends React.Component { 

 render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Dashboard/> 
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
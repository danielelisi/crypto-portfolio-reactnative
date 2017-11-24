import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TestView from './views/TestView';
import PieChartComponent from './components/PieChartComponent.js'


export default class App extends React.Component {

 render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <PieChartComponent/>
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
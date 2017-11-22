//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as publicAPI from '../api/bittrex/public';
import * as market from '../api/bittrex/market';
import creds from '../api/bittrex/creds'

// create a component  
class TestView extends Component {

    componentDidMount() {

        let apiKey = creds.API_KEY;
        let apiSecret = creds.API_SECRET;
        
        let promise = market.getOpenOrders(apiKey, apiSecret);
        
        // let promise = publicAPI.getMarketSummary('btc-ltc');

        promise.then(response=>console.log(response))
         .catch((reason) => console.log(reason)) 
    
    }

    render() {
        return (
            <View>
                <Text>TestView</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default TestView;

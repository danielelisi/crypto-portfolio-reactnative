import React, {Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

export default class TestComponent extends Component {

    render() {
        return(
            <View style={{
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Slide left to right to open the drawer</Text>
            </View>
        )
    }
}
import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    TextInput,
    Text,
    Button,
    StyleSheet
} from 'react-native';

export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
            bittrexPublicAPI: null,
            bittrexSecretAPI: null
        }
    }

    _saveBittrexKeys = () => {
        AsyncStorage.setItem('bittrexPublicKey', this.state.bittrexPublicAPI)
            .then( result => console.log(result))
            .catch( error => console.log(error));

        AsyncStorage.setItem('bittrexSecretKey', this.state.bittrexSecretAPI)
            .then( result => console.log(result))
            .catch( error => console.log(error));
    };

    _showBittrexKeys = () => {
        AsyncStorage.getItem('bittrexPublicKey')
            .then( result => console.log(result))
            .catch( error => console.log(error));

        AsyncStorage.getItem('bittrexSecretKey')
            .then( result => console.log(result))
            .catch( error => console.log(error));
    };

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Public API Key'
                    value={this.state.bittrexPublicAPI}
                    returnKeyType='next'
                    onChangeText={(bittrexPublicAPI) => this.setState({bittrexPublicAPI})}
                />
                <TextInput
                    placeholder='Secret API Key'
                    value={this.state.bittrexSecretAPI}
                    returnKeyType='done'
                    onChangeText={(bittrexSecretAPI) => this.setState({bittrexSecretAPI})}
                />
                <Button title='Save Bittrex API Keys' onPress={this._saveBittrexKeys}/>
                <Button title='Show Bittrex API Keys' onPress={this._showBittrexKeys}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputText: {
        flex:1
    }
});
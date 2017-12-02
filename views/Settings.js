import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    TextInput,
    Text,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native';

import creds from '../api/bittrex/creds';

export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
            bittrexPublicAPI: creds.API_KEY,
            bittrexSecretAPI: creds.API_SECRET,
            secureSecret: true
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

        this.setState({
            secureSecret: !this.state.secureSecret
        })
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Public API Key'
                        value={this.state.bittrexPublicAPI}
                        returnKeyType='next'
                        onChangeText={(bittrexPublicAPI) => this.setState({bittrexPublicAPI})}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder='Secret API Key'
                        value={this.state.bittrexSecretAPI}
                        returnKeyType='done'
                        onChangeText={(bittrexSecretAPI) => this.setState({bittrexSecretAPI})}
                        secureTextEntry={this.state.secureSecret}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonAPI}>
                        <Button
                            title='Save Bittrex API Keys'
                            onPress={this._saveBittrexKeys}
                        />
                    </View>
                    <View style={styles.buttonAPI}>
                        <Button
                            title='Show Bittrex API Keys'
                            onPress={this._showBittrexKeys}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
    },
    textContainer: {
        flex:1,
        justifyContent: 'center'
    },
    inputText: {
        padding: 10,
        margin: 20
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonAPI: {
        margin: 10
    }

});
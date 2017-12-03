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
const {width, height} = Dimensions.get('screen');


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
                <View style={styles.pageHeader}>
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Settings</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Public API Key</Text>
                    <TextInput
                        style={[styles.inputText,{width:width - 40}]}
                        placeholder='Please enter your public API key'
                        value={this.state.bittrexPublicAPI}
                        returnKeyType='next'
                        onChangeText={(bittrexPublicAPI) => this.setState({bittrexPublicAPI})}
                        underlineColorAndroid={'#4b79c1'}
                        selectionColor={'#4b79c1'}
                    />

                    <Text style={styles.label}>Secret API Key</Text>
                    <TextInput
                        style={[styles.inputText,{width:width - 40}]}
                        placeholder='Please enter your secret API key'
                        value={this.state.bittrexSecretAPI}
                        returnKeyType='done'
                        onChangeText={(bittrexSecretAPI) => this.setState({bittrexSecretAPI})}
                        secureTextEntry={this.state.secureSecret}
                        underlineColorAndroid={'#4b79c1'}
                        selectionColor={'#4b79c1'}
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
        backgroundColor: '#191919'
    },
    pageHeader : {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor:'black'
    },
    textContainer: {
        flex:1,
        justifyContent: 'center'
    },
    label:{
        color: '#fff',
        marginLeft: 20,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '400'
    },
    inputText: {
        padding: 10,
        marginLeft: 20,
        marginBottom: 10,
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonAPI: {
        margin: 10
    }

});
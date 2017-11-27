import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import twitter from 'react-native-twitter';
import twitterCredentials from '../api/twitter/credentials';
import TweetComponent from "../components/TweetComponent";
import { Accelerometer } from 'expo'

export default class TwitterNews extends Component {
    constructor() {
        super();
        this.state = {
            twitterData: null,
            /** SHAKE EVENT RELATED STATES */
            mAccel: 0.0,
            mAccelCurrent: 9.8
        }
    }

    /*************************************
     * SHAKE EVENT RELATED FUNCTIONS
     ************************************/
    _toggleAccel = () => {
        console.log('toggling shake event')

        if(this._subscription) {
            console.log('untoggling shake event')
            this._unsubscribe();
        } else {
            console.log('turning on shake event')
            this._subscribe()
        }
    };

    _accelSetUpdateInterval = (interval) => {
        Accelerometer.setUpdateInterval(interval)
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(accelerometerData=> {
            let {x, y, z} = accelerometerData;
            let mAccelLast = this.state.mAccelCurrent;
            let mAccelCurrent = Math.sqrt((x*x + y*y + z*z));
            let delta = mAccelCurrent - mAccelLast;
            let mAccel = this.state.mAccel * 0.9 + delta;
            this.setState({mAccelCurrent, mAccel}, ()=>{
                if (mAccel >= 1) {
                    console.log('shake!!')
                    //do something here
                }
            })
        })
        console.log('done?')
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null
    }


    componentDidMount() {

        //toggle the shake event listener
        this._toggleAccel();
        this._accelSetUpdateInterval(512);

        // fetch tweets
        const client = twitter(twitterCredentials);

        client.rest.get('search/tweets', {
            q: '%23cryptocurrency', // search this hashtag
            lang: 'en'
        })
        .then(result => this.setState({twitterData: result.statuses}) )
        .catch(err => console.log('Error:' + err))

    }

    renderTweets() {
        // iterate trough the tweets list and render each tweet as a component
        return this.state.twitterData.map( tweet => <TweetComponent key={tweet.id} tweet={tweet} /> )
    }

    render() {
        return(
            <ScrollView
                style={styles.twitterContainer}
            >
                {this.state.twitterData !== null
                    ? this.renderTweets()
                    : <ActivityIndicator />
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    twitterContainer: {
        flex: 1,
        marginTop: 24
    }
});
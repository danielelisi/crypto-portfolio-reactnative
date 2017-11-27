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

export default class TwitterNews extends Component {
    constructor() {
        super();
        this.state = {
            twitterData: null
        }
    }

    componentDidMount() {
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
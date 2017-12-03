import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class TweetComponent extends Component {
    constructor(props) {
        super(props);

    }

    formatDate(input) {

        let date = input.substring(4,10)+ ' ' + input.substring(26, 30) + ' ';
        let time = input.substring(11,19);
        let day = input.substring(0,4);

        return (
            <Text style={styles.tweetSmall}>
                {day}
                <Text>{date}</Text>
                <Text>{time}</Text>
            </Text>
        )
    }

    tweetHighlight(text, key) {
        return (
            <Text key={key} style={{color:'#00aced'}}>{text+ ' '}</Text>
        )
    }

    viewTweetText(words) {
        return words.map((elem,i) =>  
            {
                elem = elem.trim();
                let result = elem+' ';
                if (elem[0]==='#') result = this.tweetHighlight(elem,i);
                
                return result;
            }
        )
    }

    parseTweet(text) {

        let words = text.replace( /\n/g, " " ).split( " " );

        return (
            <Text style={styles.tweet}>
                {
                    this.viewTweetText(words)    
                } 
            </Text> 
        )
    }

    render() {
        let {tweet} = this.props;

        return(
            <View style={styles.tweetContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{uri: tweet.user.profile_image_url_https}}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.username}>
                        {tweet.user.name + ' '}
                        <Text style={styles.tweetSmall}>@{tweet.user.screen_name}</Text>
                    </Text>
                    {this.parseTweet(tweet.text)}
                    <Text>
                        { this.formatDate(tweet.created_at)} 
                    </Text>
                </View>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tweetContainer: {
        flex: 1,
        backgroundColor: '#F0F0F2',
        flexDirection: 'row',
        borderBottomColor: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 2,
        paddingBottom: 5, 
        paddingTop: 5
    },
    tweetSmall: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: width/30,
        fontWeight: 'normal'
    },
    username:{
        paddingTop:5, 
        fontWeight:'bold' 
    },
    tweet: { 
        paddingTop:1,
        paddingBottom: 4 
    },
    profileContainer: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 4, 
        paddingBottom: 4
    },
    profileImage: { 
        width: 48,
        height: 48 
    },
    textContainer: {
        flex: 4,
        paddingLeft: 1,
        paddingHorizontal: 6,
        flexDirection:'column'
    }
});

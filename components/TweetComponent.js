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
                    <Text style={styles.username}>{tweet.user.name}</Text>
                    <Text style={styles.tweet}>{tweet.text}</Text>
                </View>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tweetContainer: {
        flex: 1,
        margin: 8,
        paddingVertical: 8,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
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
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4

    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    textContainer: {
        flex: 3,
        paddingLeft: 1,
        paddingHorizontal: 6,
        flexDirection:'column'
    }
});

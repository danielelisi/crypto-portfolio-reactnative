import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';

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
                    <Text>{tweet.user.name}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text>{tweet.text}</Text>
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
        backgroundColor: '#c3c3c3',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 4

    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textContainer: {
        flex: 2,
        paddingHorizontal: 4
    }
});

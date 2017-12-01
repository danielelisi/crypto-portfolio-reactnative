import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
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
            mAccelCurrent: 9.8,
            /** ALERT STATE */
            alert: {},

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
                    this._fetchTweets()
                    .then (response => {
                        //check if there are new tweets, if first items in the array and response doesn't match, append the items to the array
                        if(response.statuses[0].text != this.state.twitterData[0].text){
                            this.setState({
                                twitterData:response.statuses,
                                alert: {
                                    key: 0, 
                                    backgroundColor: '#32A54A', 
                                    type: 'success',
                                    title: 'Refreshed',
                                    message: 'Your news feed is now up to date.'
                                }
                            },() => this.showAlert(this.state.alert));
                        } else {
                            console.log('Alert!!!');

                            //implement alert popup
                            //set the alert type
                            this.setState({
                                alert: {
                                    key: 0, 
                                    backgroundColor: '#2B73B6', 
                                    type: 'info',
                                    title: 'No new tweets',
                                    message: 'You are currently up to date. Please refresh later to check for updates.'
                                }
                            },() => this.showAlert(this.state.alert));

                        }
                    })
                    .catch(err => console.log('Error:' + err));
                }
            })
        })
        console.log('done?')
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null
    }

    /*************************************
     * ALERT RELATED FUNCTIONS
     *************************************/

    showAlert(item) {
        if (item.type == 'close') {
          this.closeAlert()
        } else {
          const title = item.title
          this.dropdown.alertWithType(item.type, title, item.message)
        }
      }
    closeAlert = () => {
        this.dropdown.close()
      }
    onClose(data) {
        console.log(data);
      }
    

    _fetchTweets = () => {
        return this.twitterClient.rest.get('search/tweets', {
            q: '%23cryptocurrency', // search this hashtag
            lang: 'en'
        })
    }

    renderTweets() {
        // iterate trough the tweets list and render each tweet as a component
        return this.state.twitterData.map( tweet => <TweetComponent key={tweet.id} tweet={tweet} /> )
    }

    componentDidMount() {

        //toggle the shake event listener
        this._toggleAccel();
        this._accelSetUpdateInterval(512);

        this.twitterClient = twitter(twitterCredentials);

        // fetch tweets
        this._fetchTweets()
            .then(result => this.setState({twitterData: result.statuses}) )
            .catch(err => console.log('Error:' + err))
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return(
            <View
                style={styles.twitterContainer}
            >
                <ScrollView>
                    {this.state.twitterData !== null
                        ? this.renderTweets()
                        : <ActivityIndicator />
                    }
                </ScrollView>

                <DropdownAlert
                  ref={(ref) => this.dropdown = ref}
                  containerStyle={{
                    backgroundColor: '#2B73B6'
                  }}
                  showCancel={true}
                  onClose={(data) => this.onClose(data)}
                  onCancel={(data) => this.onClose(data)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    twitterContainer: {
        flex: 1,
        marginTop: 24
    }
});
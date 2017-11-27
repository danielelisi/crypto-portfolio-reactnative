import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import Carousel from 'react-native-snap-carousel'

import AreaSpline from '../components/charts/AreaSpline';
import Pie from '../components/charts/Pie';
import CardComponent from '../components/CardComponent'
import colors from '../components/charts/colors'

import * as account from '../api/bittrex/account';
import * as market from '../api/bittrex/market'
import * as pub from '../api/bittrex/public'
import * as bitcoin from '../api/bittrex/bitcoin'
import creds from '../api/bittrex/creds';
// import cryptoIcons from '../assets/icons/cryptocurrency/icons'
import { Accelerometer } from 'expo'

const {width, height} = Dimensions.get('screen');

export default class Dashboard extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            /** PIE CHART RELATED STATES */
            activeIndex: 0,
            data: [],
            colors: [],
            theme: 'red',
            currencyInfo: [],
            totalBtcPortfolio: 0,
			btcPrice: 0,
			coinList:[],
            /** SHAKE EVENT RELATED STATES */
            mAccel: 0.0,
            mAccelCurrent: 9.8
        };

        this._onPieItemSelected = this._onPieItemSelected.bind(this);
        this._renderItem = this._renderItem.bind(this);

        this.getValue = this.getValue.bind(this);
        this.renderList = this.renderList.bind(this);

        this.horizontalMargin = 25;
        this.verticalMargin = 10;
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

    /*************************************
     * BITTREX API RELATED FUNCTIONS
     ************************************/
    getBtcValue() {
        return new Promise(resolve=> {
            bitcoin.getEquivalent()
                .then( response => resolve(response.bpi.USD.rate_float))
                .catch( err => console.log(err))
        })
    }

    async queryBtcValue() {
        return await this.getBtcValue();
    }

	getCurrencies() {
		return new Promise(resolve=> {
			pub.getCurrencies()
				.then(response=>resolve(response.result))
				.catch( err=> console.log(err))
		})
	}
	async queryCurrencies() {
		return await this.getCurrencies();
	}

    getMarketSummaries() {
        /*
         * Get the whole market with one API call then filter it in compute balances
         */
        return new Promise( resolve => {
            pub.getMarketSummaries()
                .then( response => resolve(response.result))
                .catch( err => console.log(err))
        });
    }

	computeBalances(balances, btcPrice) {
        let data = [];
        let counter = 0;

        return new Promise( async resolve => {
            let marketSummaries =  await this.getMarketSummaries();
			let currencies = await this.getCurrencies();

            balances.forEach( (balance, index) => {
				
				let currencyInfo = currencies.find(currency=> currency.Currency === balance.Currency)
				let marketName = (balance.Currency === 'USDT' || balance.Currency === 'BTC') ? 'USDT-BTC' : 'BTC-'+ balance.Currency ; ;
                let holdings = balance.Available; 
                // let icon = cryptoIcons[balance.Currency];

                // search for the coin in the market summary
                let coinMarket = marketSummaries.find( market => market.MarketName === marketName);
                console.log(coinMarket);

                let btcTotalValue, usdTotalValue;
                if(marketName === 'USDT-BTC') {
                    btcTotalValue = holdings / coinMarket.Last;
                    usdTotalValue = holdings;
                } else {
                    btcTotalValue = holdings * coinMarket.Last;
                    usdTotalValue = btcTotalValue * btcPrice;
                }
				
				let coin = this.state.coinList.Data[balance.Currency]
				let icon = {
					uri : `${this.state.coinList.BaseImageUrl}${coin.ImageUrl}`
				}

				if (coin===null) {
					icon = require('../assets/icons/cryptocurrency/0x.png')
				}
				data.push({   
					currency: balance.Currency, 
					holdings: holdings,
					price: coinMarket.Last,
					btcPrice: btcTotalValue,
					usdValue: usdTotalValue,
					longname: currencyInfo.CurrencyLong, 
					icon: icon
				});
                // if(counter === balances.length-1) {
                //
                // }
                // counter++;
            });

            resolve(data)
        });
    }

    async componentDidMount() {

        //toggle the shake event listener
        // this._toggleAccel();
        // this._accelSetUpdateInterval(1000);

		let btcPrice = await this.queryBtcValue();
		let coinList = await bitcoin.getCoinList()
		

        this.setState({
			btcPrice,
			coinList
        });

        account.getBalances(creds.API_KEY, creds.API_SECRET)
            .then( async (balancesList) => {
                console.log('Dashboard Component Did Mount getBalances response:');
                console.log(balancesList.result);
                let filteredBalances = balancesList.result.filter( coin => coin.Available > 0);
                let coinsData = await this.computeBalances(filteredBalances, btcPrice);
                this.setState(
                    {
                        data: coinsData
                    },
                    () => {

                        // sum array of btc values
                        let totalBtcPortfolio = this.state.data.map( item => item.btcPrice).reduce( (total, amount) => total + amount);

                        let colors = this._getRandomColors(this.state.data.length);
                        this.setState({
                            colors,
                            totalBtcPortfolio
                        });
                })
            })
            .catch( err => console.log(err));


    }

    // componentWillUnmount() {
    //     this._unsubscribe()
    // }

    /*************************************
     * PIE CHART RELATED FUNCTIONS
     ************************************/
    _getRandomColors(count) {

        return colors.slice(0, count);
    }

    _onPieItemSelected(newIndex){
        this.setState({...this.state, activeIndex: newIndex});
    }

    getValue(item) {
        return item.btcPrice;
    }

    _renderItem({item, index}) {

        const itemWidth = width - (this.horizontalMargin*2);

        return (
            <View style={{flex: 1, width: itemWidth}}>
                <CardComponent data={item} color = {this.state.colors[index]}/>
            </View>
        )
    }

    renderList(data, setSelectedIndex) {
        //getSelectedIndex : gets the current selectedIndex
        //setSelectedIndex : sets the selectedIndex
        // this._onPieItemSelected is the selecteditem function in the pie component

        const itemWidth = width - (this.horizontalMargin*2);

        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this._renderItem} // loop trough elements in data array and passes singular item and index to function
                sliderWidth={width}
                itemWidth={itemWidth}
                onSnapToItem={setSelectedIndex}
                slideStyle={{flex:1,
                    marginTop: this.verticalMargin,
                    marginBottom: this.verticalMargin}}
            />
        )
    }

    /*************************************
     * RENDER STARTS HERE
     ************************************/
    render() {

        return (
            <View style={styles.container} >
                <Text style={styles.chart_title}>Dashboard</Text>
                <Text style={styles.portfolioValue}>Total BTC: {this.state.totalBtcPortfolio.toFixed(8)}</Text>
                <Text style={styles.portfolioValue}>Total USD: ${(this.state.totalBtcPortfolio * this.state.btcPrice).toFixed(2)}</Text>
                <View style={styles.PieContainer} >
                    {this.state.data.length === 0 && <ActivityIndicator color={'green'} size={'large'}/>}
                    {this.state.data.length !== 0 &&
                    <Pie
                        highlightExpand={10}
                        thickness={50}
                        onItemSelected={this._onPieItemSelected}
                        colors={this.state.colors}
                        width={width}
                        height={height}
                        data={this.state.data}
                        renderListCallback={this.renderList}
                        valueAccessor={this.getValue} />
                    }
                </View>
            </View>

        )
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor:'#dedede',
        marginTop: 24,
    },
    PieContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    chart_title : {
        paddingTop: 15,
        textAlign: 'center',
        paddingBottom: 5,
        fontSize: 18,
        backgroundColor:'black',
        color: 'white',
        fontWeight:'bold',
    },
    portfolioValue: {
        textAlign: 'center',
        fontSize: 16,
        paddingTop:8
    },
    label: {
        fontSize: 25,
        fontWeight: 'normal'
    }
}


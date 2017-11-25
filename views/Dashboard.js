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
import cryptoIcons from '../assets/icons/cryptocurrency/icons'

const {width, height} = Dimensions.get('screen')

export default class Dashboard extends Component{

	constructor(props){
		super(props);
		this.state = { 
			activeIndex: 0,
			data: [],
			colors: [],
			theme: 'red', 
			currencyInfo: [] 
		};
		
		this._onPieItemSelected = this._onPieItemSelected.bind(this);
		this._renderItem = this._renderItem.bind(this)
		
		this.getValue = this.getValue.bind(this)
		this.renderList = this.renderList.bind(this)

		// this.colors = this._getRandomColors(data.spendingsLastMonth.length) 

		this.horizontalMargin = 25;
		this.verticalMargin = 10
			
	}

	getConversionEquiv() {
		return new Promise(resolve=> {
			bitcoin.getEquivalent()
			 .then(response=>resolve(parseFloat(response.bpi.USD.rate)))
			 .catch(err=>console.log(err))
		})
	}

	async queryConversionEquiv() {
		let value = await this.getConversionEquiv();
		return value
	}

	getMarketSummary(market) {

		return new Promise(resolve=>{
			pub.getTicker(market)
			 .then(response=>resolve(response.result))
			 .catch(err=>console.log(err)) 
		})
	} 

	async queryMarketSummary(market) { 

		let marketSummary = await this.getMarketSummary(market);
		return marketSummary 
	}   

	computeBalances(balances, conversionValue) { 
		var data = [];  
		var counter = 0;
		
		return new Promise(resolve=> {
			balances.forEach(async (balance, index)=>{    
				
				let marketName = balance.Currency==='USDT'? 'USDT-BTC' : 'BTC-'+balance.Currency;
				let marketSummary = await this.getMarketSummary(marketName);
				let holdings = balance.Available * conversionValue
				let icon = cryptoIcons[balance.Currency]

				data.push({   
					currency: balance.Currency, 
					holdings: holdings, 
					ask: marketSummary.Ask,
					bid: marketSummary.Bid,
					last: marketSummary.Last,
					longname: bitcoin.names[balance.Currency], 
					icon: icon
				})  

				if(counter === balances.length-1) {  
					resolve(data)
				} 
				counter++;
			}) 
		})
	}

	async componentDidMount() { 
		
		let promise = account.getBalances(creds.API_KEY, creds.API_SECRET);
		let conversionValue = await this.queryConversionEquiv(); 
		
		promise.then(async (response)=> {
			// console.log(response.result)
			let balances = response.result.filter(item=> item.Available>0 && item.Currency !== 'BTC')
			var newData = await this.computeBalances(balances, conversionValue);
			this.setState({   
				data: newData  
			}, ()=> {
				let colors = this._getRandomColors(this.state.data.length);
				this.setState({colors}) 
			})
		}).catch(err=>console.log(err))
	} 

	_getRandomColors(count) {
			
		return colors.slice(0, count);   
	}  
 
	_onPieItemSelected(newIndex){ 
		this.setState({...this.state, activeIndex: newIndex});   
	} 
  
	getValue(item) {   
		return item.holdings 
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
				renderItem={this._renderItem}
				sliderWidth={width} 
				itemWidth={itemWidth}  
				onSnapToItem={setSelectedIndex}  
				slideStyle={{flex:1, 
					marginTop: this.verticalMargin, 
					marginBottom: this.verticalMargin}}    
			/> 
		)
	} 

	render() {
			
		return ( 
			
				<View style={styles.container} >
					<Text style={styles.chart_title}>Dashboard</Text> 
					<View style={styles.content} >
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
  }, 
  content: { 
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
  label: {
    fontSize: 25,
		fontWeight: 'normal'
	}
}

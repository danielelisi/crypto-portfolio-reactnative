import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
	View,
	Dimensions
} from 'react-native';

import Carousel from 'react-native-snap-carousel'

import AreaSpline from '../components/charts/AreaSpline';
import Pie from '../components/charts/Pie';
import data from '../components/resources/data';
 
const randomcolor = require('randomcolor')

type State = { 
  activeIndex: number,
  spendingsPerYear: any
}

const {width, height} = Dimensions.get('screen')

export default class Dashboard extends Component{

	state: State;
 
	constructor(props){
		super(props);
	    this.state = { 
	      activeIndex: 0,
	      spendingsPerYear: data.spendingsPerYear,
			};
			
			this._onPieItemSelected = this._onPieItemSelected.bind(this);
			this._renderItem = this._renderItem.bind(this)
			
			this.getValue = this.getValue.bind(this)
			this.renderList = this.renderList.bind(this)

			this.colors = this._getRandomColors(data.spendingsLastMonth.length) 
	}

		_getRandomColors(count) {
			 
			let result = []

			for(let x = 0 ; x < count ; x++) {
				result.push(randomcolor())
			}

			return result;
		}

	  _onPieItemSelected(newIndex){
	    this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: data.spendingsPerYear});   
	  }

		getValue(item) { 
			return item.number
		}
		
		

		_renderItem({item, index}) {
			console.log(index)
			return (
				<View width={width-50} style={{backgroundColor: this.colors[index], height: 150, borderColor: 'black', borderRadius:5, borderWidth: 2}}> 
					<Text>{item.name}</Text>    
					 
				</View> 
			)   
		}  

		renderList(data, setSelectedIndex) {
			//getSelectedIndex : gets the current selectedIndex
			//setSelectedIndex : sets the selectedIndex
			// this._onPieItemSelected is the selecteditem function in the pie component 
			
			let itemWidth = width - 50;
			return (  
				<Carousel 
					ref={(c) => { this._carousel = c; }}
					data={data}
					renderItem={this._renderItem}
					sliderWidth={data.length*itemWidth}
					itemWidth={itemWidth} 
					onSnapToItem={setSelectedIndex} 
					sliderHeight={height/2}
					itemHeight= {200} 
				/>
			)
		} 

	  render() {
			 
	    return ( 
	      
	        <View style={styles.container} >
	          <Text style={styles.chart_title}>Random Title</Text> 
	          <Pie
							highlightExpand={10}
							thickness={50}
	            onItemSelected={this._onPieItemSelected}
	            colors={this.colors} 
	            width={width} 
	            height={height}
							data={data.spendingsLastMonth}
							renderListCallback={this.renderList}
							valueAccessor={this.getValue} />
	        </View> 
	      
	      )
	  }
	}


const styles = {
  container: {
		flex: 1,   
    backgroundColor:'whitesmoke',  
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',  
    paddingBottom: 5,
    fontSize: 18,
    backgroundColor:'grey',
    color: 'white',
    fontWeight:'bold',
  },
  label: {
    fontSize: 25,
		fontWeight: 'normal'
  }
}

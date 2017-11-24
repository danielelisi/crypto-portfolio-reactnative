import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
	View,
	Dimensions
} from 'react-native';

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
			this.getValue = this.getValue.bind(this)
			this.colors = this._getRandomColors(data.spendingsLastMonth.length) 
			this.renderList = this.renderList.bind(this)
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
 

		renderList(data, setSelectedIndex) {
			//getSelectedIndex : gets the current selectedIndex
			//setSelectedIndex : sets the selectedIndex
			// this._onPieItemSelected is the selecteditem function in the pie component 
			
			return (
				<ScrollView horizontal={true} snapToAlignment={'center'} snapToInterval={1} pagingEnabled={true} contentContainerStyle={{flexGrow: 1}}>  
				{   
					data.map((item, index) =>     
					{ 
						var fontWeight = this.state.activeIndex == index ? 'bold' : 'normal';
						return (   
							<TouchableWithoutFeedback key={index} onPress={()=>setSelectedIndex(index)} >   
								<View width={width}>   
									<Text style={[styles.label, {backgroundColor: this.colors[index], color: 'white', fontWeight: fontWeight}]}>{item.name}</Text>    
								</View>  
							</TouchableWithoutFeedback>    
						);	
		
					}) 
				}
				</ScrollView>  
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

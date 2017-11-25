import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet} from 'react-native';


export default class CardComponent extends Component{


	constructor(props){
		super(props);
		this.state = {}
	}
 
	render() { 

		const location = this.props.iconLocation;

		return (  
			<View 
			style={[styles.container, {backgroundColor:this.props.color}]}>
				<Text style={styles.header}>{this.props.data.longname}</Text>
				<View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>   
						<Image 
						source={this.props.data.icon} resizeMode={'contain'}    
						/>
					</View> 
					<View style={styles.info}>  
						<Text>Holdings: {this.props.data.holdings} {this.props.data.currency}</Text>   
						<Text>Last: {this.props.data.last} {this.props.data.currency}</Text>   
						<Text>Ask: {this.props.data.ask} {this.props.data.currency}</Text>   
						<Text>Bid: {this.props.data.bid} {this.props.data.currency}</Text> 
					</View>  
				</View>   
				    
			</View>   
		);
	}  
}

const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		borderRadius: 5,   
		borderColor: 'white',
		
		backgroundColor: 'white'
	},
	header: {  
		fontSize: 24,
		padding: 5,
		color: '#efeeee'
	},    
	icon: {
 
	},
	info: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'space-around'
	}
}) 
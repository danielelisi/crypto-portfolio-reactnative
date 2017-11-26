import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet} from 'react-native';


export default class CardComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
        }
	}
 
	render() {
		const location = this.props.iconLocation;
        let {data} = this.props;

		return (  
			<View 
			style={[styles.container, {backgroundColor:this.props.color}]}>
				<Text style={styles.header}>{this.props.data.longname}</Text>
				<View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
					<View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 4}}>
						<Image 
						source={data.icon} resizeMode={'contain'} style={styles.coinIcon}
						/>
					</View> 
					<View style={styles.info}>  
						<Text>Coin Holdings: {data.holdings.toFixed(6)} {data.currency}</Text>
                        <Text>Price: {data.price.toFixed(6)} BTC</Text>
						<Text>BTC Value: {data.btcPrice.toFixed(6)} BTC</Text>
						<Text>USD Value: ${data.usdValue.toFixed(2)}</Text>
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
	coinIcon: {
        height:100,
        width: 100
	},
	info: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'space-around'
	}
}) 
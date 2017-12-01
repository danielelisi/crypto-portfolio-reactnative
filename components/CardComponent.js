import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

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
				<Text style={[styles.header,{fontSize:width/16}]}>{this.props.data.longname}</Text>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 4,backgroundColor: 'rgba(0,0,0,0.5)'}}>
						<Image 
						source={data.icon} resizeMode={'contain'} style={{height:width/5, width:width/5,borderRadius:width/10}}
						/>
					</View> 
					<View style={styles.info}>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoLabel,{fontSize:width/30}]}>Coin Holdings </Text>
                            <Text style={[styles.infoText,{fontSize:width/27}]}>{data.holdings.toFixed(6)} {data.currency}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoLabel,{fontSize:width/30}]}>Price </Text>
                            <Text style={[styles.infoText,{fontSize:width/27}]}>{data.price.toFixed(6)} BTC</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoLabel,{fontSize:width/30}]}>BTC Value </Text>
                            <Text style={[styles.infoText,{fontSize:width/27}]}>{data.btcPrice.toFixed(6)} BTC</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.infoLabel,{fontSize:width/30}]}>USD Value </Text>
                            <Text style={[styles.infoText,{fontSize:width/27}]}>${data.usdValue.toFixed(2)}</Text>
                        </View>
                    </View>
				</View>
			</View>   
		);
	}  
}

const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		borderColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
		backgroundColor: 'white'

},
	header: {
		fontWeight: 'bold',
		padding: 5,
		marginLeft: 10,
		color: '#efeeee'
	},
	info: {
		flex: 2,
		paddingTop: 12,
		alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)'
	},
    infoContainer: {
	    flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
	infoText: {
		color: '#fff',
        fontWeight: '700',
        alignItems: 'flex-end'
	},
    infoLabel:{
        color: '#fff',
	    fontWeight: '100'
    }
}) 
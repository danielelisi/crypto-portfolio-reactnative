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
				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={{flex:1, justifyContent:'center', alignItems:'center', paddingLeft: 4,backgroundColor: 'rgba(0,0,0,0.5)'}}>
						<Image 
						source={data.icon} resizeMode={'contain'} style={styles.coinIcon}
						/>
					</View> 
					<View style={styles.info}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Coin Holdings </Text>
                            <Text style={styles.infoText}>{data.holdings.toFixed(6)} {data.currency}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>Price </Text>
                            <Text style={styles.infoText}>{data.price.toFixed(6)} BTC</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>BTC Value </Text>
                            <Text style={styles.infoText}>{data.btcPrice.toFixed(6)} BTC</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>USD Value </Text>
                            <Text style={styles.infoText}>${data.usdValue.toFixed(2)}</Text>
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
		fontSize: 24,
		fontWeight: 'bold',
		padding: 5,
		marginLeft: 10,
		color: '#efeeee'
	},    
	coinIcon: {
        height: 85,
        width: 85,
		borderRadius: 40
	},
	info: {
		flex: 2,
		paddingTop: 5,
		alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)'
	},
    infoContainer: {
	    flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7
    },
	infoText: {
		color: '#fff',
        fontWeight: '700',
        alignItems: 'flex-end',
        fontSize: 18
	},
    infoLabel:{
        color: '#fff',
	    fontWeight: '100'
    }
}) 
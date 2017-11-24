import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput,Text, View, Image} from 'react-native';

export default class CardComponent extends Component{

	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
			<View>
				<Text>This is a card component</Text>
			</View>
		);
	}
}
// @flow
'use strict';

var randomColor = require('randomcolor');

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import AnimShape from '../art/AnimShape';

const d3 = {
  scale,
  shape,
}; 

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

type Props = {
  height: number,
  width: number,
  colors: any, 
  onItemSelected: any,
  highlightExpand: number, 
  thickness: number,
  renderListCallback: func,
  valueAccessor: func
};

type State = {
  highlightedIndex: number,
};

class Pie extends React.Component {

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this._createPieChart = this._createPieChart.bind(this);
    // this._value = this._value.bind(this);
    // this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);

    //adjust the pie dimensions based on other properties
    this.pieWidth = this.props.width - this.props.highlightExpand * 2 - styles.container.margin * 2;  
    this.pieHeight = this.props.height / 2; //pie takes half of the screen 
  } 

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  // _value(item) { return item.number; }

  // _label(item) { return item.name; } 

  _color(index) { return this.props.colors[index]; }

  _createPieChart(index) {

    const innerRadius = this.pieWidth/2 - this.props.thickness

    var arcs = d3.shape.pie()
        .value(this.props.valueAccessor)
        (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.pieWidth/2 + 10) 
      .padAngle(.02)
      .innerRadius(innerRadius); 

    var arc = d3.shape.arc()
      .outerRadius(this.pieWidth/2)
      .padAngle(.02)
      .innerRadius(innerRadius);

    var arcData = arcs[index];
    var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);

     return {
       path,
       color: this._color(index),
     };
  }

  _onPieItemSelected(index) {
    this.setState({...this.state, highlightedIndex: index});
    this.props.onItemSelected(index); 
  }

 
  render() {
    const margin = styles.container.margin;
    const x = this.props.width / 2 ;
    const y = this.pieHeight / 2 + margin;   
  
    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.pieHeight}> 
           <Group x={x} y={y}> 
           { 
              this.props.data.map( (item, index) =>
              (<AnimShape
                 key={'pie_shape_' + index}
                 color={this._color(index)}
                 d={ () => this._createPieChart(index)}
              />) 
              )
            }
           </Group>
        </Surface>
        <View style={styles.pieList}>
          {  
            this.props.renderListCallback(this.props.data, this._onPieItemSelected)     
          }
        </View> 
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 20,
  },
  pieList: {
    flex: 1, 
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center' 
  }
};

export default Pie;

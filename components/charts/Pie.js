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



class Pie extends React.Component {

 

  constructor(props: Props) {
    super(props);
    this.state = { 
      highlightedIndex: 0, 
      pieLayoutHeight: 0,
      pieLayoutWidth: 0
    };

    const margin = 20;

    this._createPieChart = this._createPieChart.bind(this);
    // this._value = this._value.bind(this);
    // this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);

    this.pieLayout = this.pieLayout.bind(this); 
    //adjust the pie dimensions based on other properties
    this.pieRadius = Math.floor((this.props.width - this.props.highlightExpand * 2 - margin * 2)/2);  
    // this.pieHeight = this.props.height / 2; //pie takes half of the screen 
  } 

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  // _value(item) { return item.number; }

  // _label(item) { return item.name; } 

  _color(index) { return this.props.colors[index]; }

  _createPieChart(index) {
 
    console.log('creating pie chart with radius '+ this.pieRadius)
    
    const innerRadius = this.pieRadius - this.props.thickness

    var arcs = d3.shape.pie()
        .value(this.props.valueAccessor)
        (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.pieRadius + this.props.highlightExpand) 
      .padAngle(.02)
      .innerRadius(innerRadius);  

    var arc = d3.shape.arc()
      .outerRadius(this.pieRadius)
      .padAngle(.02)
      .innerRadius(innerRadius);

    var arcData = arcs[index];
    var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);

    console.log(path);
     return {
       path,
       color: this._color(index),
     };
  }

  _onPieItemSelected(index) {
    this.setState({...this.state, highlightedIndex: index});
    this.props.onItemSelected(index); 
  }

  pieLayout(event) {
    let {width, height} = event.nativeEvent.layout
    console.log('changing layout')
    this.setState({
      pieLayoutWidth: width,
      pieLayoutHeight: height
    }, ()=> console.log(this.state.pieLayoutHeight+ ' ' + this.state.pieLayoutWidth))
  }
  render() { 

    const pieMargin = styles.pieContainer.margin; 
    const x = Math.floor(this.state.pieLayoutWidth / 2) ; 
    const y = Math.floor(this.state.pieLayoutHeight / 2) ;   
   
    console.log('width is '+ this.state.pieLayoutWidth)
    console.log('x is '+x+' and y is '+y); 
    return ( 
      <View style={styles.container}> 
        <View style={styles.pieContainer} onLayout={this.pieLayout}>
          <Surface width={this.state.pieLayoutWidth} height={this.state.pieLayoutHeight}>   
            { this.state.pieLayoutWidth !== 0 && 
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
            }
          </Surface> 
        </View>
        <View style={styles.pieInfo}> 
          {this.props.renderListCallback(this.props.data, this._onPieItemSelected)}  
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',  
    justifyContent: 'center' 
  },
  pieInfo: {
    flex: 1, 
    alignItems: 'center'   
  },  
  pieContainer: {
    flex: 2,
    alignItems: 'center'
  }
};

export default Pie;

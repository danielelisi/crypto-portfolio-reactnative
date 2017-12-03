// @flow
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  Dimensions,
  Animated,
  Easing
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

    let total = this._computeTotal()
    this.state = { 
      highlightedIndex: 0, 
      pieLayoutHeight: 0,
      pieLayoutWidth: 0,
      total: total,
      pieRadius: 0,
      fadeAnim: new Animated.Value(0)
    };

    this.margin = 20;

    this._createPieChart = this._createPieChart.bind(this);
    // this._value = this._value.bind(this);
    // this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);

    this.pieLayout = this.pieLayout.bind(this); 
    //adjust the pie dimensions based on other properties
    // this.pieRadius = Math.floor((this.props.width - this.props.highlightExpand * 2 - margin * 2)/2);  
    // this.pieHeight = this.props.height / 2; //pie takes half of the screen 
  } 

  _computeTotal() {

    let result = 0

    this.props.data.forEach((item) => {
      result += this.props.valueAccessor(item)
    })

    return result;
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  // _value(item) { return item.number; }

  // _label(item) { return item.name; } 

  _color(index) { return this.props.colors[index]; }

  _createPieChart(index) {
 
    const innerRadius = this.state.pieRadius - this.props.thickness

    var arcs = d3.shape.pie()
        .value(this.props.valueAccessor)
        (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.state.pieRadius + this.props.highlightExpand) 
      .padAngle(.02)
      .innerRadius(innerRadius);  

    var arc = d3.shape.arc()
      .outerRadius(this.state.pieRadius)
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

  pieLayout(event) {
    let {width, height} = event.nativeEvent.layout

    let minSize = Math.min(width,height);

    console.log('changing layout')
    this.setState({
      pieLayoutWidth: width,
      pieLayoutHeight: height,
      pieRadius: Math.floor((minSize - this.props.highlightExpand * 2 - this.margin * 2)/2)
    }, ()=> console.log(this.state.pieLayoutHeight+ ' ' + this.state.pieLayoutWidth))
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start()
  }

  render() { 

    const pieMargin = styles.pieContainer.margin; 
    const x = Math.floor(this.state.pieLayoutWidth / 2) ; 
    const y = Math.floor(this.state.pieLayoutHeight / 2) ;   
    const item = this.props.data[this.state.highlightedIndex]
    const percentage = this.props.valueAccessor(item) / this.state.total*100;
    const circleDiameter = (this.state.pieRadius - this.props.thickness)*2
    
    let {fadeAnim} = this.state;

    return ( 
      
      <View style={styles.container}> 
        <View style={styles.pieContainer} onLayout={this.pieLayout}>
          <Animated.View style={[styles.pieAnimatedView, {opacity:fadeAnim}]}>
            <View style={[styles.innerView, 
              {width: circleDiameter, height: circleDiameter, borderRadius:circleDiameter/2, 
              backgroundColor:this._color(this.state.highlightedIndex)}]}>
              <Text style={styles.innerTextSmall}>HOLDINGS</Text>
              <Text style={styles.innerTextLarge}>{percentage.toFixed(0)}</Text>
              <Text style={styles.innerTextSmall}>PERCENT</Text>
            </View>
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
          </Animated.View>
         
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
    justifyContent: 'center' ,
  },
  pieInfo: {
    flex: 1, 
    alignItems: 'center'   
  },  
  pieContainer: { 
    flex: 2,
    
  },
  pieAnimatedView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerView: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },

  innerTextLarge: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#efeeee'
  },
  innerTextSmall: {
    fontSize: 16,
    color: '#efeeee'
  }
};

export default Pie;

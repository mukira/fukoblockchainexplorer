import React, { Component } from 'react'
import './style.css'
import _ from 'lodash'
import {ResponsiveContainer, AreaChart, Area, Tooltip, XAxis} from 'recharts';

class GasUse extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {}
      }
  }
  
  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }
  
  getDataState(data) {

    // Set the Component state
    this.setState({
      data: data
    })
  }
  
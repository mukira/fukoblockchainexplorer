import React, { Component } from 'react'
import './style.css'
import { ResponsiveContainer, LineChart, XAxis, Legend, Tooltip, Line } from 'recharts';

class BlockStats extends Component {
  
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
  
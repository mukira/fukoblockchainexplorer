import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './style.css';

class LatestTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    this.getDataState(this.props.data);
  }

  getDataState(data) {
    // Set the Component state
    this.setState({
      data: data
    });
  }
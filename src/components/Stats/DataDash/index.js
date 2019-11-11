import React, { Component } from 'react';
import './style.css';

class DataDash extends Component {
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

  componentWillReceiveProps(nextProps) {
    var props_old = this.props.data;
    var props_new = nextProps.data;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (props_old !== props_new) this.getDataState(props_new);
  }

  getDataState(data) {
    // Set the Component state
    this.setState({
      data: data
    });
  }
import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

import { web3_eth_getBlock } from '../../../web3Helpers';

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    await this.getTransactionListState(this.props.block);
  }


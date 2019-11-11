import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
Import TransactionList from './TransctionList';

import moment from 'moment';

import { web3_eth_getBlock} from '../../web3Helpers';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    };
  }

  async componentWillMount() {
    var block_hash = this.props.match.params.blockHash;
    await this.getBlockState(block_hash);
  }
  
  async componentWillReceiveProps(nextprops) {
    var block_hash_old = this.props.match.params.blockHash;
    var block_hash_new = nextProps.match.params.blockHash;

    if (block_hash_old !== block_hash_new)
    await this.getBlockState(block_hash_new);
  }
}
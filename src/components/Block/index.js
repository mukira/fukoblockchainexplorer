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
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (block_hash_old !== block_hash_new)
    await this.getBlockState(block_hash_new);
  }

  async getBlockState(block_hash) {
    // Use web3 to get the Block object
    var currBlockObj = await web3_eth_getBlock(block_hash);
    console.log(currBlockObj);
    // Set the Component state
    this.setState({
      block_id: currBlockObj.number,
      block_hash: currBlockObj.hash,
      block_ts: moment.unix(parseInt(currBlockObj.timestamp, 10)),
      block_txs: parseInt(currBlockObj.transactions.slice().length, 10),
      block: currBlockObj
    });
  }
render() {
  const block = this.state.block;
  if (!block.difficulty) {
    return <pre>loading...</pre>;
  }
}

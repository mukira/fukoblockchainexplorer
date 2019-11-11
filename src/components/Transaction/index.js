import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import {
  web3_eth_getTransactionByHash,
  web3_eth_getTransactionReceipt
} from '../../web3Helpers';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: []
    };
  }

  async componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var tx_hash = this.props.match.params.txHash;
    await this.getTxState(tx_hash);
  }

  async componentWillReceiveProps(nextProps) {
    var tx_hash_old = this.props.match.params.txHash;
    var tx_hash_new = nextProps.match.params.txHash;
    // compare old and new URL parameter (block hash)
    // if different, reload state using web3
    if (tx_hash_old !== tx_hash_new) await this.getTxState(tx_hash_new);
  }

  async getTxState(tx_hash) {
    // Use web3 to get the Block object
    var currTxObj = await web3_eth_getTransactionByHash(tx_hash);
    currTxObj.currTxReceipt = await web3_eth_getTransactionReceipt(tx_hash);
    if (currTxObj.currTxReceipt.status === '0x1') currTxObj.status = 'Success';
    else currTxObj.status = 'Fail';

    // Set the Component state
    this.setState({
      tx: currTxObj
    });
  }
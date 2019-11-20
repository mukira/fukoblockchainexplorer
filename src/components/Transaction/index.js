import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import {
  web3_eth_getTransactionByHash,
  web3_eth_getTransactionReceipt
} from '../../web3Helpers';

// reactstrap components
import { CardTitle,Col,Card,Table } from "reactstrap";
import { IconPermissions } from '@aragon/ui'


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

  render() {
    const tx = this.state.tx;

    if (!tx) {
      return <pre>loading...</pre>;
    }
    const value = parseInt(tx.value, 10) / 1000000000000000000;
    //    const difficultyTotal = parseInt(block.totalDifficulty, 10);
    return (
      <div className="Transaction">
      <Col xs={12} md={12}>
        
              <Card className="card-tasks">
        <br />
        <CardTitle tag="h2"><IconPermissions width="54px" height="54px" color="#2ca8ff"/>
 Transaction Info</CardTitle> 
        <div className="table-full-width table-responsive">
          <Table responsive>
            <tbody>
              <tr>
                <td className="text-left">Tx Hash: </td>
                <td>{tx.hash}</td>
              </tr>
              <tr>
                <td className="text-left">Tx Status: </td>
                <td>{tx.status}</td>
              </tr>
              <tr>
                <td className="text-left">Block Hash: </td>
                <td>
                  <Link to={`../block/${tx.blockHash}`}>{tx.blockHash}</Link>
                </td>
              </tr>
              <tr>
                <td className="text-left">Block Number: </td>
                <td>{tx.blockNumber}</td>
              </tr>
              <tr>
                <td className="text-left">From: </td>
                <td>
                  <Link to={`../address/${tx.from}`}>{tx.from}</Link>
                </td>
              </tr>
              <tr>
                <td className="text-left">To: </td>
                <td>
                  <Link to={`../address/${tx.to}`}>{tx.to}</Link>
                </td>
              </tr>
              <tr>
                <td className="text-left">Value: </td>
                <td>{value}</td>
              </tr>
              <tr>
                <td className="text-left">Gas: </td>
                <td>{tx.gas}</td>
              </tr>
              <tr>
                <td className="text-left">Gas Price: </td>
                <td>{tx.gasPrice.c[0]}</td>
              </tr>
              <tr>
                <td className="text-left">Input: </td>
                <td>{tx.input}</td>
              </tr>
              <tr>
                <td className="text-left">Nonce: </td>
                <td>{tx.nonce}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        </Card>

      </Col>
</div>
    );
  }
}
export default Transaction;

import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import TransactionList from "./TransactionList";

import moment from "moment";

import { web3_eth_getBlock } from "../../web3Helpers";
import { IconApps } from "@aragon/ui";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    };
  }

  async componentWillMount() {
    // Get the block hash from URL arguments (defined by Route pattern)
    var block_hash = this.props.match.params.blockHash;
    await this.getBlockState(block_hash);
  }

  async componentWillReceiveProps(nextProps) {
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
      return  (
        <div class="loaderdiv">
          <div class="loader">
            <span class="box"></span>
            <span class="box"></span>
            <div class="code">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/iyf-camp-thika.appspot.com/o/fukoblockchainexplorer%2FIllustration09.png?alt=media&token=dfa64fe0-0026-43e5-9639-599cfa4344ac"
                width="120px"
              />
            </div>
            <span class="txt">Fuko Blockchain Explorer</span>
          </div>
        </div>
      );
    }

    const difficulty = parseInt(block.difficulty.toNumber(), 10);
    const difficultyTotal = parseInt(block.totalDifficulty, 10);

    return (
      <div className="Blockcontainer">
        <br />
        <h2>
          <IconApps width="54px" height="54px" color="#ffffff" /> Block Info
        </h2>
        <div className="BlockcontainerText">
          <table>
            <tbody>
              <tr>
                <td className="tdLabel">When: </td>
                <td>{this.state.block_ts.fromNow()}</td>
              </tr>
              <tr>
                <td className="tdLabel">Height: </td>
                <td>{block.number}</td>
              </tr>
              <tr>
                <td className="tdLabel">Timestamp: </td>
                <td>{this.state.block_ts.format()}</td>
              </tr>
              <tr>
                <td className="tdLabel">Transactions: </td>
                <td>{this.state.block_txs}</td>
              </tr>
              <tr>
                <td className="tdLabel">Hash: </td>
                <td>{block.hash}</td>
              </tr>
              <tr>
                <td className="tdLabel">Parent hash: </td>
                <td>
                  <Link to={`../block/${block.parentHash}`}>
                    {block.parentHash}
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Nonce: </td>
                <td>{block.nonce}</td>
              </tr>
              <tr>
                <td className="tdLabel">Size: </td>
                <td>{block.size} bytes</td>
              </tr>
              <tr>
                <td className="tdLabel">Difficulty: </td>
                <td>{difficulty}</td>
              </tr>
              <tr>
                <td className="tdLabel">Total Difficulty: </td>
                <td>{difficultyTotal}</td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Limit: </td>
                <td>{block.gasLimit}</td>
              </tr>
              <tr>
                <td className="tdLabel">Gas Used: </td>
                <td>{block.gasUsed}</td>
              </tr>
              <tr>
                <td className="tdLabel">Sha3Uncles: </td>
                <td>{block.sha3Uncles}</td>
              </tr>
              <tr>
                <td className="tdLabel">Miner: </td>
                <td>
                  <Link to={`../address/${block.miner}`}>{block.miner}</Link>
                </td>
              </tr>
              <tr>
                <td className="tdLabel">Extra data: </td>
                <td>{block.extraData}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <br />
          {block.hash && <TransactionList block={block.hash} />}
        </div>
      </div>
    );
  }
}
export default Block;

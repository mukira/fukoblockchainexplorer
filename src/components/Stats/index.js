import React, { Component } from "react";

import "./style.css";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { Grid } from "react-bootstrap";

// core components
import PanelHeader from "./components/PanelHeader/PanelHeader.jsx";

import DataDash from "./DataDash";

import AvgBlockTime from "./AvgBlockTime";
import AvgTxCount from "./AvgTxCount";
import BlockStatsGas from "./BlockStatsGas";
import BlockStatsSize from "./BlockStatsSize";
import BlockStatsTransactions from "./BlockStatsTransactions";
import BlockMoons from "./BlockMoons";
import GasUsed from "./GasUsed";
import GasUnused from "./GasUnused";

import LastBlock from "./LastBlock";
import LatestBlocks from "./LatestBlocks";
import LatestTransactions from "./LatestTransactions";
import TxPerSec from "./TxPerSec";

import Constants from "./../Constants";

import {
  web3_eth_getBlockNumber,
  web3_eth_getBlock,
  web3_eth_hashrate,
  web3_eth_gasPrice,
  web3_net_peerCount
} from "../../web3Helpers";

var TimerMixin = require("react-timer-mixin");

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      curr_block: null,
      hashrate: null,
      gasPrice: null,
      peerCount: null
    };
  }

  async componentWillMount() {
    var curr_block_no = await web3_eth_getBlockNumber();
    this.setState({
      curr_block: curr_block_no
    });
    await this.getBlocks(curr_block_no);
  }

  componentDidMount() {
    this.timer = TimerMixin.setInterval(async () => {
      var curr_block_no = await web3_eth_getBlockNumber;

      if (curr_block_no > this.state.blocks[0]) {
        const block = await web3_eth_getBlock(curr_block_no, true);
        const hashrate = await web3_eth_hashrate();
        const gasPrice = await web3_eth_gasPrice();
        const peerCount = await web3_net_peerCount();

        if (block) {
          this.state.blocks.pop();
          this.state.blocks.unshift(block);
        }

        this.setState({
          curr_block: curr_block_no,
          hashrate: hashrate,
          gasPrice: gasPrice,
          peerCount: peerCount
        });
      }
    }, 3000);
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  async getBlocks(curr_block_no) {
    const blocks = this.state.blocks.slice();
    var max_blocks = Constants.MAX_BLOCKS;
    if (curr_block_no < max_blocks) max_blocks = curr_block_no;
    for (var i = 0; i < max_blocks; i++, curr_block_no--) {
      var currBlockObj = await web3_eth_getBlock(curr_block_no, true);
      blocks.push(currBlockObj);
    }
    const hashrate = await web3_eth_hashrate();
    const gasPrice = await web3_eth_gasPrice();
    const peerCount = await web3_net_peerCount();
    this.setState({
      blocks: blocks,
      hashrate: hashrate,
      gasPrice: gasPrice,
      peerCount: peerCount
    });
  }

  render() {
    if (!this.state || !this.state.blocks.length) {
      return <pre> loading...</pre>;
    }
    return (
      <div>
        <PanelHeader size="lg" 
        content={
          <div className="chart-area">
                    <GasUsed data={this.state} />
                  </div>
                  
        }
        />

        <div className="content">
          <div class="card-stats card-raised card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="statistics">
                    <div class="info">
                      <div class="icon icon-primary">
                        <i class="now-ui-icons ui-2_chat-round"></i>
                      </div>
                      <h5 class="info-title">
                        <AvgBlockTime data={this.state} />
                      </h5>
                      <h6 class="stats-title">Avg Block Time</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="statistics">
                    <div class="info">
                      <div class="icon icon-success">
                        <i class="now-ui-icons business_money-coins"></i>
                      </div>
                      <h5 class="info-title">
                        <LastBlock data={this.state} />
                      </h5>
                      <h6 class="stats-title">Last Block</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="statistics">
                    <div class="info">
                      <div class="icon icon-info">
                        <i class="now-ui-icons users_single-02"></i>
                      </div>
                      <h5 class="info-title">
                        <AvgTxCount data={this.state} />
                      </h5>
                      <h6 class="stats-title">Avg Tx Count</h6>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="statistics">
                    <div class="info">
                      <div class="icon icon-danger">
                        <i class="now-ui-icons objects_support-17"></i>
                      </div>
                      <h5 class="info-title">
                        <TxPerSec data={this.state} />
                      </h5>
                      <h6 class="stats-title">Tx / Sec</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Gas Price</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <BlockStatsGas data={this.state} />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <DataDash data={this.state} />
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Size</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <BlockStatsSize data={this.state} />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <DataDash data={this.state} />
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Transactions</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <BlockStatsTransactions data={this.state} />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <DataDash data={this.state} />
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col sm={12} md={12}>
              <GasUsed data={this.state} />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} sm={12}>
              <BlockMoons data={this.state} />
              <br />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} lg={6}>
              <br />
              <LatestTransactions data={this.state} />
            </Col>
            <Col xs={12} lg={6}>
              <br />
              <LatestBlocks data={this.state} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Stats;

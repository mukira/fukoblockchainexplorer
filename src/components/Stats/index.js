import React, { Component } from 'react';
import './style.css';
import DataDash from './DataDash';
import { Grid } from 'react-bootstrap';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";


import AvgBlockTime from './AvgBlockTime';
import AvgTxCount from './AvgTxCount';
import BlockStats from './BlockStats';
import BlockMoons from './BlockMoons';
import GasUse from './GasUse';
import LastBlock from './LastBlock';
import LatestBlocks from './LatestBlocks';
import LatestTransactions from './LatestTransactions';
import TxPerSec from './TxPerSec';

import Constants from './../Constants';

import {
  web3_eth_getBlockNumber,
  web3_eth_getBlock,
  web3_eth_hashrate,
  web3_eth_gasPrice,
  web3_net_peerCount
} from '../../web3Helpers';

var TimerMixin = require('react-timer-mixin');

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      curr_block: null,
      hashrate: null,
      gasPrice: null,
      peerCount: null,
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
      return <pre> Fuko Blockchain Explorer Loading...</pre>;
    }
    return (
      <div>
      <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h4 className="title">Transactions</h4>
                    </CardHeader>
                    <CardBody>
                      <Nav
                        className="nav-tabs-primary justify-content-center"
                        tabs
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 1)}
                            href="#pablo"
                          >
                            Wallet
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 2
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 2)}
                            href="#pablo"
                          >
                            Send
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 3
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 3)}
                            href="#pablo"
                          >
                            News
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">COIN</th>
                                <th className="header">AMOUNT</th>
                                <th className="header">VALUE</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>BTC</td>
                                <td>7.342</td>
                                <td>48,870.75 USD</td>
                              </tr>
                              <tr>
                                <td>ETH</td>
                                <td>30.737</td>
                                <td>64,53.30 USD</td>
                              </tr>
                              <tr>
                                <td>XRP</td>
                                <td>19.242</td>
                                <td>18,354.96 USD</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                        <TabPane tabId="tab2">
                          <Row>
                            <Label sm="3">Pay to</Label>
                            <Col sm="9">
                              <FormGroup>
                                <Input
                                  placeholder="e.g. 1Nasd92348hU984353hfid"
                                  type="text"
                                />
                                <FormText color="default" tag="span">
                                  Please enter a valid address.
                                </FormText>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Label sm="3">Amount</Label>
                            <Col sm="9">
                              <FormGroup>
                                <Input placeholder="1.587" type="text" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button
                            className="btn-simple btn-icon btn-round float-right"
                            color="primary"
                            type="submit"
                          >
                            <i className="tim-icons icon-send" />
                          </Button>
                        </TabPane>
                        <TabPane tabId="tab3">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">Latest Crypto News</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>The Daily: Nexo to Pay on Stable...</td>
                              </tr>
                              <tr>
                                <td>Venezuela Begins Public of Nation...</td>
                              </tr>
                              <tr>
                                <td>PR: BitCanna – Dutch Blockchain...</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              </div>
      <div className="Stats">
        <br />
        <Grid>
          <Row className="show-grid">
            <Col xs={6} sm={4}>
              <DataDash data={this.state} />
            </Col>
            <Col xs={6} sm={8}>
              <BlockStats data={this.state} />
              <br />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={4} sm={3}>
              <AvgBlockTime data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <LastBlock data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <AvgTxCount data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <GasUse data={this.state} />
              <TxPerSec data={this.state} />
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

import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";

import "./style.css";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";
import { Grid } from "react-bootstrap";

// core components
import PanelHeader from "./components/PanelHeader/PanelHeader.jsx";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "./variables/charts.jsx";

import DataDash from "./DataDash";

import AvgBlockTime from "./AvgBlockTime";
import AvgTxCount from "./AvgTxCount";
import BlockStatsGas from "./BlockStatsGas";
import BlockStatsSize from "./BlockStatsSize";
import BlockStatsTransactions from "./BlockStatsTransactions";
import BlockMoons from "./BlockMoons";
import GasUse from "./GasUse";
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
        <PanelHeader size="lg" content={<GasUse data={this.state} />} />
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="card-stats card-raised card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <div class="statistics">
                      <div class="info">
                        <div class="icon icon-primary">
                          <i class="now-ui-icons ui-2_chat-round"></i>
                        </div>
                        <AvgBlockTime data={this.state} />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="statistics">
                      <div class="info">
                        <div class="icon icon-success">
                          <i class="now-ui-icons business_money-coins"></i>
                        </div>
                        <LastBlock data={this.state} />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="statistics">
                      <div class="info">
                        <div class="icon icon-info">
                          <i class="now-ui-icons users_single-02"></i>
                        </div>
                        <AvgTxCount data={this.state} />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="statistics">
                      <div class="info">
                        <div class="icon icon-danger">
                          <i class="now-ui-icons objects_support-17"></i>
                        </div>
                        <TxPerSec data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Gas Price</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <BlockStatsGas data={this.state} />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Size</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-outline-default btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <BlockStatsSize data={this.state} />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons arrows-1_refresh-69" /> Just
                    Updated
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
                    <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <h5 className="card-category">Backend Development</h5>
                  <CardTitle tag="h4">Tasks</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731609871"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip923217206"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip907509347"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip907509347"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip496353037"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip496353037"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
                            Flooded: One year later, assessing what was lost and
                            what was found when a ravaging rain swept through
                            metro Detroit
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip326247652"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip326247652"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip389516969"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip389516969"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 3
                    minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <h5 className="card-category">All Persons List</h5>
                  <CardTitle tag="h4">Employees Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} sm={4}>
              <DataDash data={this.state} />
            </Col>
            <Col sm={4} md={3}>
              <GasUse data={this.state} />
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

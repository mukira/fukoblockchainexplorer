import React, { Component } from "react";
import "./style.css";
import Block from "./../Block";
import Transaction from "./../Transaction";
import Address from "./../Address";
import Home from "./../Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { IconWallet } from "@aragon/ui";

import {
  Navbar,
  Nav,
  NavItem,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

import logo from "./logo.png";

import { web3_eth_getTransactionByHash } from "../../web3Helpers";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };

    // This binding is necessary to make `this` work in the callback
    this.search = this.search.bind(this);
  }

  async search(e) {
    const history = createHistory({ forceRefresh: true });
    if (this.state.searchValue.length === 42) {
      // address
      history.push("/address/" + this.state.searchValue);
    } else if (this.state.searchValue.length === 66) {
      // block or tx
      if (await web3_eth_getTransactionByHash(this.state.searchValue)) {
        //transaction
        history.push("/tx/" + this.state.searchValue);
      } else {
        // block
        history.push("/block/" + this.state.searchValue);
      }
    } else {
      console.log("nothing");
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar className="navbar-absolute fixed-top navbar-transparent  navbar navbar-expand-lg bg-transparent">
          <div className="logo">
            <a href="/" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={logo} alt="react-logo" />
              </div>
            </a>
            <a href="/" className="simple-text logo-normal">
              Fuko Blockchain Explorer
            </a>
          </div>

          <Nav className="justify-content-end collapse navbar-collapse">
            <NavItem>
              <form>
                <InputGroup className="no-border">
                  <Input
                    type="text"
                    placeholder="Tx, Block or Address"
                    value={this.state.searchValue}
                    onChange={evt => this.updateInputValue(evt)}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        this.search();
                      }
                    }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <IconWallet onClick={this.search} />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="App-nav">
          {" "}
          {
            <Router>
              <div>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/block"
                  render={() => <h3>Please select a blockHash.</h3>}
                />
                <Route path="/block/:blockHash" component={Block} />
                <Route
                  exact
                  path="/tx"
                  render={() => <h3>Please select a transaction hash.</h3>}
                />
                <Route path="/tx/:txHash" component={Transaction} />
                <Route
                  exact
                  path="/address"
                  render={() => <h3>Please select an address.</h3>}
                />
                <Route path="/address/:address" component={Address} />
              </div>
            </Router>
          }
        </div>
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value.trim()
    });
  }
}
export default App;

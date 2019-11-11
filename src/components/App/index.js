import React, { Component } from 'react';
import './style.css';
import Block from './../Block';
import Address from './../Address';
import Home from './../Home';
import { BrowserRouter as Router, Route } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import {
Navbar,
Nav,
FormGroup,
FormControl,
Button,
NavItem
} from 'react-bootstrap';

import {web3_eth_getTransactionByHash} from '../../web3Helpers';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  // This binding is necessary to make 'this' work in callback
  this.search = this.search.bind(this);
  }
  async search(e) {
    const history = createhistory({ forceRefresh: true });
    if (this.state.searchValue.length === 42) {
      //adress
      history.push('/adress/' + this.state.searchValue);
    } else if (this.state.searchValue.length === 66){
      // block or tx
      if (await web3_eth_getTransactionByHash(this.state.searchValue)) {
        // transaction
        history.push('/tx/' + this.state.searchValue);
        } else {
          //block
          history.push('/block/' + this.state.searchValue);
        }
       } else {
         console.log('nothing')
       }  
    }

    render() {
      return (
        <div className="App">
          <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">
                  <i className="fab fa-ethereum" /> Block Explorer
                </a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem>
                <Navbar.Form className="form-inline">
                  <FormGroup>
                    <FormControl 
                     type="text"
                     placeholder="Tx, Block or Address"
                     value={this.state.searchValue}
                     onChange={evt => this.updateInputValue(evt)}
                     onKeyPress={e => {
                       if (e.key === 'Enter') {
                         this.search();
                       }
                     }}
                    />
                  </FormGroup>{' '}
                  <Button className="btn-secondary" onClick={this.search}>
                    <i className="fas fa-search" />
                  </Button>
                
              </NavItem>
            </Nav>
        </div>
      )
    }
  }
}

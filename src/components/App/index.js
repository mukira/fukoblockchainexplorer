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


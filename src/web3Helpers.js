import Web3 from 'web3';

import Constants from './Constants'

Let provider;

if (window.web3 && window.web3.currentProvider) {
  provider = window.web3.provider;
} else {
  provider = new Web3.providers.HttpProvider(Constants.PROVIDER);
}

export const web3 = new Web3(provider);

export const web3_eth_getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


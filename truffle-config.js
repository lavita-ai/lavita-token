const HDWalletProvider = require('@truffle/hdwallet-provider');
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    ganache: {
      host: "127.0.0.1",
      network_id: 9988,
      port: 18888,
      gas: 20000000
    },
    
    theta_privatenet: {
      provider: () => {
        var privateKeyTest01 = '1111111111111111111111111111111111111111111111111111111111111111'; 
        var privateKeyTest02 = '93a90ea508331dfdf27fb79757d4250b4e84954927ba0073cd67454ac432c737';
        var privateKeyTest03 = '3333333333333333333333333333333333333333333333333333333333333333';
        var privateKeyTest04 = '4444444444444444444444444444444444444444444444444444444444444444';
        var privateKeyTest05 = '5555555555555555555555555555555555555555555555555555555555555555';
        var privateKeyTest06 = '6666666666666666666666666666666666666666666666666666666666666666';
        var privateKeyTest07 = '7777777777777777777777777777777777777777777777777777777777777777';
        var privateKeyTest08 = '8888888888888888888888888888888888888888888888888888888888888888';
        var privateKeyTest09 = '9999999999999999999999999999999999999999999999999999999999999999';
        var privateKeyTest10 = '1000000000000000000000000000000000000000000000000000000000000000';
 
        return new HDWalletProvider({
          privateKeys: [privateKeyTest01, privateKeyTest02, privateKeyTest03, privateKeyTest04, privateKeyTest05, privateKeyTest06, privateKeyTest07, privateKeyTest08, privateKeyTest09, privateKeyTest10],
          providerOrUrl: 'http://localhost:18888/rpc',
        });
      },
      network_id: 366,
      gasPrice: 4000000000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 1000
    },

    theta_privatenet_subchain: {
      provider: () => {
        var privateKeyTest01 = '1111111111111111111111111111111111111111111111111111111111111111'; 
        var privateKeyTest02 = '93a90ea508331dfdf27fb79757d4250b4e84954927ba0073cd67454ac432c737';
        var privateKeyTest03 = '3333333333333333333333333333333333333333333333333333333333333333';
        var privateKeyTest04 = '4444444444444444444444444444444444444444444444444444444444444444';
        var privateKeyTest05 = '5555555555555555555555555555555555555555555555555555555555555555';
        var privateKeyTest06 = '6666666666666666666666666666666666666666666666666666666666666666';
        var privateKeyTest07 = '7777777777777777777777777777777777777777777777777777777777777777';
        var privateKeyTest08 = '8888888888888888888888888888888888888888888888888888888888888888';
        var privateKeyTest09 = '9999999999999999999999999999999999999999999999999999999999999999';
        var privateKeyTest10 = '1000000000000000000000000000000000000000000000000000000000000000';
 
        return new HDWalletProvider({
          privateKeys: [privateKeyTest01, privateKeyTest02, privateKeyTest03, privateKeyTest04, privateKeyTest05, privateKeyTest06, privateKeyTest07, privateKeyTest08, privateKeyTest09, privateKeyTest10],
          providerOrUrl: 'http://localhost:19888/rpc',
        });
      },
      network_id: 360777,
      gasPrice: 4000000000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 1000
    },
 
    theta_testnet: {
      provider: () => {
 
        // Replace the private key below with the private key of the deployer wallet. 
        // Make sure the deployer wallet has a sufficient amount of TFuel, e.g. 100 TFuel
        var deployerPrivateKey = '';
 
        return new HDWalletProvider({
          privateKeys: [deployerPrivateKey],
          providerOrUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
          // providerOrUrl: 'http://localhost:28888/rpc', // deploy using a local node synced with the Testnet
        });
      },
      network_id: 365,
      gasPrice: 4000000000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 1000
    },

    theta_mainnet: {
      provider: () => {
 
        // Replace the private key below with the private key of the deployer wallet. 
        // Make sure the deployer wallet has a sufficient amount of TFuel, e.g. 100 TFuel
        var deployerPrivateKey = '12345';
 
        return new HDWalletProvider({
          privateKeys: [deployerPrivateKey],
          providerOrUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
        });
      },
      network_id: 361,
      gasPrice: 4000000000000,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 1000
    }

  },

  // Set default mocha options here, use special reporters etc.
  // mocha: {
	// enableTimeouts: false,
  //   before_timeout: 1000000000
  //   // timeout: 100000
  // },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 100
       }
      //  evmVersion: "byzantium"
      }
    }
  },

plugins: [
    "@chainsafe/truffle-plugin-abigen",
  ]
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};

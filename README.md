# Lavita Token

Reference implementation of the LAVITA Token

## Setup

First install dependencies with the following command:

```
npm install
```

Compile the solidity contracts with the following command:

```
truffle compile
```

## Test

### Test against ganache

To test against ganache, first install ganache following the steps [here](https://www.trufflesuite.com/ganache). Then, start `ganache-cli` in a terminal with the following commond:

```bash
ganache-cli --defaultBalanceEther 1000000000 -l 20000000 --networkId 9988 --port 18888
```

Next, in another terminal, run the tests with

```
# run all tests
truffle test --network ganache

# run an individual test
truffle test test/01-test-token-basics.js --network=ganache --show-events
```


## Deployment

Ganache Privatenet deployment

```bash
# Start ganache in the first terminal
ganache-cli --defaultBalanceEther 1000000000 -l 20000000 --networkId 9988 --port 18888

# Deploy from the second terminal
truffle compile
truffle migrate --network ganache --compile-none --reset
```

Theta Privatenet deployment:

```bash
truffle compile
truffle migrate --network theta_privatenet --compile-none --reset
```

Theta Testnet deployment:

```bash
truffle compile
truffle migrate --network theta_testnet --compile-none --reset
```

Theta Mainnet deployment:

```bash
truffle compile
truffle deploy --network theta_mainnet --compile-none --reset
```

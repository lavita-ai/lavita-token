const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://localhost:18888')
const web3 = new Web3(provider)
const BN = web3.utils.BN
const dec18 = new BN('1000000000000000000')
const ThetaPrivatenet = 'theta_privatenet';
const ThetaTestnet = 'theta_testnet';
const ThetaMainnet = 'theta_mainnet';
const Ganache = 'ganache';

const LavitaToken = artifacts.require("LavitaToken")

let name = "Lavita Token";
let symbol = "LAVITA";
let decimal = 18;
let maxSupply = dec18.mul(new BN(8000000000)); // FIXME: set proper value
let minter;
let stakerRewardPerBlock = 10; // FIXME: set proper value
let initDistrWallet;
let initMintAmount;
let admin;

module.exports = async function (deployer, network, accounts) {

    minter = getMinterAddress(network);
    if (network == ThetaMainnet) { // the Mainnet
        initDistrWallet = ""; // FIXME: set proper value
        initMintAmount = 0; // FIXME: set proper value
        admin = ""; // FIXME: set proper value
    } else { // all the other testing networks
        initDistrWallet = "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab";
        initMintAmount = dec18.mul(new BN(1000000000));
        admin = "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab";
    }

    await deployer.deploy(LavitaToken, 
        name, symbol, decimal, 
        maxSupply,
        minter,
        stakerRewardPerBlock,
        initDistrWallet,
        initMintAmount,
        admin, { gas: 20000000 });
};

function getMinterAddress(network) {
    if (network == ThetaPrivatenet) {
        return "";
    } else if (network == ThetaTestnet) {
        return "";
    } else if (network == ThetaMainnet) {
        return "0x62172bD5425D4d2c52be72cdf84E47Fe234c211d";
    } else if (network == Ganache) {
        return "0x0000000000000000000000000000000000000000";
    } else {
        throw "Invalid network!"
    }
}
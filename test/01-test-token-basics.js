const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://localhost:18888')
const web3 = new Web3(provider)
const BN = web3.utils.BN
const dec18 = new BN('1000000000000000000')
const LavitaToken = artifacts.require("LavitaToken");

contract("Lavita Token Basics", accounts => {
  const owner = accounts[0];
  const alice = accounts[5];
  const bob = accounts[6];

  let tokenName = "Lavita Token";
  let tokenSymbol = "LAVITA";
  let tokenDecimal = 18;
  let maxSupply = dec18.mul(new BN(8000000000));
  let minter = owner;
  let stakerRewardPerBlock = 10;
  let initDistrWallet = owner;
  let initMintAmount = dec18.mul(new BN(1000000000));
  let admin = owner;
  let lavitaToken;

  beforeEach(async () => {
    lavitaToken = await LavitaToken.new(tokenName, tokenSymbol, tokenDecimal, maxSupply,
        minter, stakerRewardPerBlock, initDistrWallet, initMintAmount, admin);
  });

  it("should have correct name, symbol and decimals", async () => {
    const name = await lavitaToken.name();
    const symbol = await lavitaToken.symbol();
    const decimals = await lavitaToken.decimals();

    assert.equal(name, "Lavita Token", "Token has incorrect name");
    assert.equal(symbol, "LAVITA", "Token has incorrect symbol");
    assert.equal(decimals, 18, "Token has incorrect decimals");
  });

  it("should have correct total supply", async () => {
    const totalSupply = await lavitaToken.totalSupply();

    assert.equal(totalSupply.toString(), initMintAmount.toString(), "Token has incorrect total supply");
  });

  it("should allow transfers between accounts", async () => {
    const amount = dec18.mul(new BN(100));

    await lavitaToken.transfer(alice, amount, { from: owner });

    const aliceBalance = await lavitaToken.balanceOf(alice);
    const ownerBalance = await lavitaToken.balanceOf(owner);

    assert.equal(aliceBalance.toString(), amount.toString(), "Transfer to Alice failed");
    assert.equal(ownerBalance.toString(), initMintAmount.sub(amount).toString(), "Transfer from owner failed");
  });

  it("should allow approvals and transfers from approved accounts", async () => {
    const amount = dec18.mul(new BN(9999));
    await lavitaToken.transfer(alice, amount, { from: owner });

    await lavitaToken.approve(bob, amount, { from: alice });

    const allowance = await lavitaToken.allowance(alice, bob);
    assert.equal(allowance.toString(), amount.toString(), "Approval failed");

    await lavitaToken.transferFrom(alice, bob, amount, { from: bob });

    const aliceBalance = await lavitaToken.balanceOf(alice);
    const bobBalance = await lavitaToken.balanceOf(bob);

    assert.equal(aliceBalance.toString(), "0", "Transfer from Alice failed");
    assert.equal(bobBalance.toString(), amount.toString(), "Transfer to Bob failed");
  });
});
const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider('http://localhost:18888')
const truffleAssert = require('truffle-assertions')

const web3 = new Web3(provider)
const BN = web3.utils.BN
const dec18 = new BN('1000000000000000000')
const LavitaToken = artifacts.require("LavitaToken");

contract("Lavita Token Basics", accounts => {
  const owner = accounts[0];
  const alice = accounts[5];
  const bob = accounts[6];
  const carol = accounts[7];

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

  it("admin permission tests", async () => {
    let errMsg = "Returned error: VM Exception while processing transaction: revert Only admin can make this call"
    await truffleAssert.reverts(lavitaToken.updateStakerRewardPerBlock(8888, {from: alice}), errMsg);
    await truffleAssert.reverts(lavitaToken.updateMinter(bob, {from: alice}), errMsg);
    await truffleAssert.reverts(lavitaToken.setPendingAdmin(bob, {from: alice}), errMsg);

    errMsg = "Returned error: VM Exception while processing transaction: revert Only pending admin can make this call"
    await truffleAssert.reverts(lavitaToken.updateAdmin({from: alice}), errMsg);
  });

  it("admin changes and token minting", async () => {
    await lavitaToken.setPendingAdmin(alice, {from: admin});
    adm = await lavitaToken.admin();
    pendingAdm = await lavitaToken.pendingAdmin();
    assert.equal(adm, admin, "Incorrect admin"); // admin should not have changed yet
    assert.equal(pendingAdm, alice, "Incorect pending admin"); // the pending admin should have been set to alice

    let errMsg = "Returned error: VM Exception while processing transaction: revert Only admin can make this call"
    await truffleAssert.reverts(lavitaToken.updateMinter(bob, {from: alice}), errMsg); // the admin has not changed yet

    errMsg = "Returned error: VM Exception while processing transaction: revert Only pending admin can make this call"
    await truffleAssert.reverts(lavitaToken.updateAdmin({from: admin}), errMsg); // the original admin cannot make this call

    await lavitaToken.updateAdmin({from: alice}) // the pending admin sets the admin to herself
    adm = await lavitaToken.admin();
    assert.equal(adm, alice, "Incorrect admin"); // admin should have changed to alice

    // Now alice becomes the admin, she can change stakerRewardPerBlock
    newStakerRewardPerBlock = new BN(8888);
    srpb = await lavitaToken.stakerRewardPerBlock();
    assert.equal(srpb.toString(), new BN(stakerRewardPerBlock).toString(), "Incorect stakerRewardPerBlock");

    await lavitaToken.updateStakerRewardPerBlock(newStakerRewardPerBlock, {from: alice});
    srpb = await lavitaToken.stakerRewardPerBlock()
    assert.equal(srpb.toString(), new BN(newStakerRewardPerBlock).toString(), "Incorect stakerRewardPerBlock");

    // Now alice can change the minter
    mter = await lavitaToken.minter();
    assert.equal(mter, admin, "Incorrect minter");
    await lavitaToken.updateMinter(bob, {from: alice});
    mter = await lavitaToken.minter();
    assert.equal(mter, bob, "Minter not updated");

    // Now that bob is the minter, he can call mintStakerReward() mint token for carol
    const mintAmount = new BN(9999);
    let carolBalance = await lavitaToken.balanceOf(carol);
    assert.equal(carolBalance.toString(), new BN(0).toString(), "Incorrect balance");

    errMsg = "Returned error: VM Exception while processing transaction: revert Only minter can make this call";
    await truffleAssert.reverts(lavitaToken.mintStakerReward(carol, mintAmount, {from: alice}), errMsg); // Alice should not be able to mint tokens
    carolBalance = await lavitaToken.balanceOf(carol);
    assert.equal(carolBalance.toString(), new BN(0).toString(), "Incorrect balance");

    await lavitaToken.mintStakerReward(carol, mintAmount, {from: bob}); // Bob should be able to mint tokens
    carolBalance = await lavitaToken.balanceOf(carol);
    assert.equal(carolBalance.toString(), mintAmount.toString(), "Incorrect balance");
  });

});

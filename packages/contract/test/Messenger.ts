import { expect } from 'chai';
import hre from 'hardhat';

describe('Messenger', function () {
  it('construct', async function () {
    const Messenger = await hre.ethers.getContractFactory('Messenger');
    const messenger = await Messenger.deploy();

    expect(await messenger.state()).to.equal(1);
  });
});

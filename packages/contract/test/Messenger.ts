import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { Overrides } from 'ethers';
import hre, { ethers } from 'hardhat';

describe('Messenger', function () {
  async function deployContract() {
    // 初めのアドレスはコントラクトのデプロイに使用されます。
    const [owner, otherAccount] = await ethers.getSigners();

    const funds = 100;

    const Messenger = await hre.ethers.getContractFactory('Messenger');
    const messenger = await Messenger.deploy({
      value: funds,
    } as Overrides);

    return { messenger, funds, owner, otherAccount };
  }

  describe('Post', function () {
    it('Should send the correct amount of tokens', async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const test_deposit = 10;

      // メッセージをpostした場合は、送り主(owner)からコントラクト(messenger)へ送金されます。
      await expect(
        messenger.post('text', otherAccount.address, {
          value: test_deposit,
        })
      ).to.changeEtherBalances(
        [owner, messenger],
        [-test_deposit, test_deposit]
      );
    });

    it('Should set the right Message', async function () {
      const { messenger, owner, otherAccount } = await loadFixture(
        deployContract
      );
      const test_deposit = 1;
      const test_text = 'text';

      await messenger.post(test_text, otherAccount.address, {
        value: test_deposit,
      });
      const messages = await messenger.connect(otherAccount).getOwnMessages();
      const message = messages[0];
      expect(message.depositInWei).to.equal(test_deposit);
      expect(message.text).to.equal(test_text);
      expect(message.isPending).to.equal(true);
      expect(message.sender).to.equal(owner.address);
      expect(message.receiver).to.equal(otherAccount.address);
    });
  });
});
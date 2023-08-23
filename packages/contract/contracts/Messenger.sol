// Messenger.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Messenger {
    // メッセージ情報を定義します。
    struct Message {
        address payable sender;
        address payable receiver;
        uint256 depositInWei;
        uint256 timestamp;
        string text;
        bool isPending;
    }

    // メッセージの受取人アドレスをkeyにメッセージを保存します。
    mapping(address => Message[]) private _messagesAtAddress;

    constructor() payable {
        console.log("Here is my first smart contract!");
    }
    
    // ユーザからメッセージを受け取り、状態変数に格納します。
    function post(string memory _text, address payable _receiver)
        public
        payable
    {
        console.log(
            "%s posts text:[%s] token:[%d]",
            msg.sender,
            _text,
            msg.value
        );
    
        _messagesAtAddress[_receiver].push(
            Message(
                payable(msg.sender),
                _receiver,
                msg.value,
                block.timestamp,
                _text,
                true
            )
        );
    }

    // メッセージ受け取りを承諾して、AVAXを受け取ります。
    function accept(uint256 _index) public {
        //指定インデックスのメッセージを確認します。
        _confirmMessage(_index);

        Message memory message = _messagesAtAddress[msg.sender][_index];

        // メッセージの受取人にavaxを送信します。
        _sendAvax(message.receiver, message.depositInWei);
    }

    // メッセージ受け取りを却下して、AVAXをメッセージ送信者へ返却します。
    function deny(uint256 _index) public payable {
        _confirmMessage(_index);

        Message memory message = _messagesAtAddress[msg.sender][_index];

        // メッセージの送信者にavaxを返却します。
        _sendAvax(message.sender, message.depositInWei);
    }

    function _confirmMessage(uint256 _index) private {
        Message storage message = _messagesAtAddress[msg.sender][_index];

        // 関数を呼び出したアドレスとメッセージの受取人アドレスが同じか確認します。
        require(
            msg.sender == message.receiver,
            "Only the receiver can _confirmMessage the message"
        );

        // メッセージが保留中であることを確認します。
        require(
            message.isPending == true,
            "This message has already been confirmed"
        );

        // メッセージの保留状態を解除します。
        message.isPending = false;
    }

    function _sendAvax(address payable _to, uint256 _amountInWei) private {
        (bool success, ) = (_to).call{value: _amountInWei}("");
        require(success, "Failed to withdraw AVAX from contract");
    }

    // ユーザのアドレス宛のメッセージを全て取得します。
    function getOwnMessages() public view returns (Message[] memory) {
        return _messagesAtAddress[msg.sender];
    }
}
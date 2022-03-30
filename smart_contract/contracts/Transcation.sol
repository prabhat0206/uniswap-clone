//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transcation {

    event Tranfer(address sender, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    function sendMoney(address payable receiver, uint amount, string memory message, string memory keyword) public {
        emit Tranfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    
}

// 0x71A1E69224970ccc40E90fE599d4579541Cd21Bd
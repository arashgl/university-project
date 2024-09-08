// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AirDrop is Ownable {
    IERC20 public token;
    uint256 public airDropAmount = 1e18 * 100;
    uint256 public airDropFee = 0.01 ether;
    mapping(address => bool)  public hasClaimed;
    uint256 public totalClaimed;

    constructor(
        address token_address
    ) Ownable(msg.sender) {
        token = IERC20(token_address);
    }

    function claim() external payable {
        require(!hasClaimed[msg.sender], "You have already claimed");
        require(msg.value >= airDropFee, "You need to pay matic to claim");
        token.transfer(msg.sender, airDropAmount);
        hasClaimed[msg.sender] = true;
        totalClaimed += airDropAmount;
    }

    function changeAirDropAmount(uint256 amount) public onlyOwner {
        airDropAmount = amount;
    }

    function changeToken(address token_address) public onlyOwner {
        token = IERC20(token_address);
    }

    function withdraw() public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function withdrawAmount(uint256 amount) public onlyOwner {
        token.transfer(msg.sender, amount);
    }
}

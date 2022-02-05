// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract BatchTransfer1155 {
    address public fromAddress;
    address public admin;

    constructor(address _fromAddress) {
        require(_fromAddress != address(0), "zero address");
        fromAddress = _fromAddress;
        admin = msg.sender;
    }

    // set ApprovalForAll first to this contract
    function batchTransfer(IERC1155 tokenContract, address[] calldata _to, uint256 tokenId) external {
        require(msg.sender == admin, "not admin");
        for (uint256 i = 0; i < _to.length; i++) {
            tokenContract.safeTransferFrom(fromAddress, _to[i], tokenId, 1, "");
        }
    }
}
// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../gatherswapv2/GatherswapFactory.sol";

contract SushiSwapFactoryMock is GatherswapFactory {
    constructor(address _feeToSetter) public GatherswapFactory(_feeToSetter) {}
}
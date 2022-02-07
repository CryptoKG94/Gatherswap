// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../gatherswapv2/GatherswapPair.sol";

contract SushiSwapPairMock is GatherswapPair {
    constructor() public GatherswapPair() {}
}
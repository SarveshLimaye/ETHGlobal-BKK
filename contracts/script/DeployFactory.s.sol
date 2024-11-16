// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, VmSafe, console2} from "forge-std/Script.sol";
import {PoolFactory} from "src/PoolFactory.sol";
import {Config} from "./helper/Config.sol";
import {Register} from "src/Register.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract DeployPoolFactory is Script {
    Config public config;
    Register.NetworkDetails public activeConfig;
    uint256 public FEE_TOKEN_DEPOSIT_AMOUNT = 2e18;
    address public priceFeed;
    address public vrfWrapper;

    function run() public returns (PoolFactory) {
        vm.stopPrank();
        vm.startBroadcast(msg.sender);
        //For optimism sepolia chain. Change for other chains
        address pythAddress = 0x0708325268dF9F66270F1401206434524814508b;
        address pythEntropy = 0x4821932D0CDd71225A6d914706A621e0389D7061;

        PoolFactory poolFactory =
            new PoolFactory(activeConfig.routerAddress, activeConfig.linkAddress, activeConfig.chainSelector, pythAddress,pythEntropy);

        IERC20(activeConfig.linkAddress).approve(address(poolFactory), FEE_TOKEN_DEPOSIT_AMOUNT);
        poolFactory.depositFeeToken(FEE_TOKEN_DEPOSIT_AMOUNT);

        vm.stopBroadcast();
        return poolFactory;
    }
}

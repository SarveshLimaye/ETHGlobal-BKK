// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Script, console2} from "forge-std/Script.sol";
import {CrossChainPool} from "src/CrossChainPool.sol";
import {PoolFactory} from "src/PoolFactory.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// todo update it with real pks
contract DeployPoolFromFactory is Script {
function run() public  {
        address sepoliaFactory = 0x86552b6aaf1D7f0ffFc7cEe029A501e4883308bC;
        address sepoliaLink = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

        address arbFactory = 0x7E33E711612Af4c4522d89C8F88f7eA9E925a5D3;
        address arbLink = 0xb1D4538B4571d411F07960EF2838Ce337FE1E80E;

        address deployedSepoliaPool;
 
        address deployedArbSepoliaPool;
      
        
        PoolFactory sepoliaFactoryContract =   PoolFactory(sepoliaFactory);
   
        vm.startBroadcast(msg.sender);

        address deployedPool = sepoliaFactoryContract.deployCCPoolsCreate2(
            arbFactory,
            sepoliaLink,
            arbLink,
            421614,
            "LINK POOL"
        );

        deployedSepoliaPool = deployedPool;
        (address poolDest, uint64 selector) = CrossChainPool(deployedSepoliaPool).getCrossChainSenderAndSelector();
        deployedArbSepoliaPool = poolDest;
        console2.log("deployed on sepolia", deployedSepoliaPool);
        console2.log("sender set on sepolia", poolDest);
        console2.log("selector set on sepolia", selector);

        vm.stopBroadcast();


    }
}
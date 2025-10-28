// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/mocks/MockUSDC.sol";

/**
 * @title DeployMockUSDC
 * @dev Deployment script for MockUSDC token
 * @notice Deploy with: forge script script/DeployMockUSDC.s.sol:DeployMockUSDC --rpc-url <network> --broadcast
 */
contract DeployMockUSDC is Script {
    function run() external returns (MockUSDC) {
        
        // Start broadcasting transactions
        vm.startBroadcast();
        
        // Deploy MockUSDC
        MockUSDC mockUSDC = new MockUSDC();
        
        console.log("MockUSDC deployed at:", address(mockUSDC));
        console.log("Deployer address:", msg.sender);
        console.log("Initial supply:", mockUSDC.balanceOf(msg.sender) / 10**mockUSDC.decimals(), "USDC");
        
        vm.stopBroadcast();
        
        return mockUSDC;
    }
}


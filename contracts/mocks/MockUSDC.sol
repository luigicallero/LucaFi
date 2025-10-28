// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @dev Mock USDC token for testing purposes
 * @notice This contract mimics real USDC behavior with 6 decimals
 */
contract MockUSDC is ERC20 {
    constructor() ERC20("USD Coin", "USDC") {
        // Mint 1 million USDC to deployer for initial liquidity
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /**
     * @dev Returns 6 decimals to match real USDC
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }
    
    /**
     * @dev Mint function for testing - allows anyone to mint tokens
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint (in smallest units - 6 decimals)
     * @notice In production, this would be restricted to authorized minters
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
    
    /**
     * @dev Helper function to mint with proper decimal conversion
     * @param to Address to mint tokens to
     * @param amountInWholeTokens Amount in whole USDC tokens (will be converted to 6 decimals)
     * @notice Mints 100 USDC = mint(address, 100) not mint(address, 100000000)
     */
    function mintWholeTokens(address to, uint256 amountInWholeTokens) external {
        _mint(to, amountInWholeTokens * 10 ** decimals());
    }
}


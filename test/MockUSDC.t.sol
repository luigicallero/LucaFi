// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/mocks/MockUSDC.sol";

/**
 * @title MockUSDCTest
 * @dev Test suite for MockUSDC token
 * @notice Run with: forge test --match-contract MockUSDCTest -vvv
 */
contract MockUSDCTest is Test {
    MockUSDC public usdc;
    address public owner;
    address public user1;
    address public user2;
    
    // Events to test
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function setUp() public {
        owner = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        
        usdc = new MockUSDC();
    }
    
    /*//////////////////////////////////////////////////////////////
                            DEPLOYMENT TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Deployment() public view {
        assertEq(usdc.name(), "USD Coin");
        assertEq(usdc.symbol(), "USDC");
        assertEq(usdc.decimals(), 6);
        assertEq(usdc.totalSupply(), 1_000_000 * 10**6);
        assertEq(usdc.balanceOf(owner), 1_000_000 * 10**6);
    }
    
    function test_InitialSupply() public view {
        uint256 expectedSupply = 1_000_000 * 10**usdc.decimals();
        assertEq(usdc.totalSupply(), expectedSupply);
        assertEq(usdc.balanceOf(owner), expectedSupply);
    }
    
    /*//////////////////////////////////////////////////////////////
                            DECIMALS TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_DecimalsMatchRealUSDC() public view {
        // Real USDC has 6 decimals
        assertEq(usdc.decimals(), 6);
    }
    
    /*//////////////////////////////////////////////////////////////
                            TRANSFER TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Transfer() public {
        uint256 amount = 100 * 10**6; // 100 USDC
        
        vm.expectEmit(true, true, false, true);
        emit Transfer(owner, user1, amount);
        
        usdc.transfer(user1, amount);
        
        assertEq(usdc.balanceOf(user1), amount);
        assertEq(usdc.balanceOf(owner), 1_000_000 * 10**6 - amount);
    }
    
    function test_TransferFrom() public {
        uint256 amount = 100 * 10**6; // 100 USDC
        
        // Owner approves user1 to spend
        usdc.approve(user1, amount);
        
        // user1 transfers from owner to user2
        vm.prank(user1);
        usdc.transferFrom(owner, user2, amount);
        
        assertEq(usdc.balanceOf(user2), amount);
        assertEq(usdc.balanceOf(owner), 1_000_000 * 10**6 - amount);
        assertEq(usdc.allowance(owner, user1), 0);
    }
    
    function test_RevertWhen_TransferInsufficientBalance() public {
        uint256 amount = 2_000_000 * 10**6; // More than total supply
        
        vm.expectRevert();
        usdc.transfer(user1, amount);
    }
    
    /*//////////////////////////////////////////////////////////////
                            APPROVAL TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Approve() public {
        uint256 amount = 100 * 10**6;
        
        vm.expectEmit(true, true, false, true);
        emit Approval(owner, user1, amount);
        
        usdc.approve(user1, amount);
        
        assertEq(usdc.allowance(owner, user1), amount);
    }
    
    function test_IncreaseAllowance() public {
        uint256 initialAmount = 100 * 10**6;
        uint256 increaseAmount = 50 * 10**6;
        
        usdc.approve(user1, initialAmount);
        usdc.approve(user1, initialAmount + increaseAmount);
        
        assertEq(usdc.allowance(owner, user1), initialAmount + increaseAmount);
    }
    
    /*//////////////////////////////////////////////////////////////
                            MINT TESTS
    //////////////////////////////////////////////////////////////*/
    
    function test_Mint() public {
        uint256 mintAmount = 500 * 10**6; // 500 USDC
        uint256 initialBalance = usdc.balanceOf(user1);
        
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0), user1, mintAmount);
        
        usdc.mint(user1, mintAmount);
        
        assertEq(usdc.balanceOf(user1), initialBalance + mintAmount);
        assertEq(usdc.totalSupply(), 1_000_000 * 10**6 + mintAmount);
    }
    
    function test_MintWholeTokens() public {
        uint256 wholeTokenAmount = 1000; // 1000 USDC (will be converted to 1000 * 10**6)
        uint256 expectedAmount = wholeTokenAmount * 10**usdc.decimals();
        
        usdc.mintWholeTokens(user1, wholeTokenAmount);
        
        assertEq(usdc.balanceOf(user1), expectedAmount);
    }
    
    function test_MintToMultipleUsers() public {
        uint256 amount = 100 * 10**6;
        
        usdc.mint(user1, amount);
        usdc.mint(user2, amount);
        
        assertEq(usdc.balanceOf(user1), amount);
        assertEq(usdc.balanceOf(user2), amount);
        assertEq(usdc.totalSupply(), 1_000_000 * 10**6 + (amount * 2));
    }
    
    function test_AnyoneCanMint() public {
        uint256 amount = 100 * 10**6;
        
        // user1 mints to user2
        vm.prank(user1);
        usdc.mint(user2, amount);
        
        assertEq(usdc.balanceOf(user2), amount);
    }
    
    /*//////////////////////////////////////////////////////////////
                            FUZZ TESTS
    //////////////////////////////////////////////////////////////*/
    
    function testFuzz_Mint(address to, uint256 amount) public {
        vm.assume(to != address(0));
        vm.assume(amount < type(uint128).max); // Prevent overflow
        
        uint256 initialSupply = usdc.totalSupply();
        usdc.mint(to, amount);
        
        assertEq(usdc.balanceOf(to), amount);
        assertEq(usdc.totalSupply(), initialSupply + amount);
    }
    
    function testFuzz_Transfer(uint256 amount) public {
        amount = bound(amount, 0, usdc.balanceOf(owner));
        
        usdc.transfer(user1, amount);
        
        assertEq(usdc.balanceOf(user1), amount);
    }
    
    function testFuzz_MintWholeTokens(uint256 wholeTokens) public {
        wholeTokens = bound(wholeTokens, 0, 1_000_000_000); // Cap at 1B tokens
        
        uint256 expectedAmount = wholeTokens * 10**usdc.decimals();
        usdc.mintWholeTokens(user1, wholeTokens);
        
        assertEq(usdc.balanceOf(user1), expectedAmount);
    }
}


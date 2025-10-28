# Smart Contracts - LucaFi

This directory contains the smart contracts for the LucaFi DeFi platform.

## 📁 Project Structure

```
web3-wallet-app/
├── contracts/           # Smart contract source files
│   └── mocks/          # Mock contracts for testing
│       └── MockUSDC.sol
├── test/               # Test files
│   └── MockUSDC.t.sol
├── script/             # Deployment scripts
│   └── DeployMockUSDC.s.sol
├── lib/                # Dependencies (forge-std, OpenZeppelin)
├── out/                # Compiled contracts
└── foundry.toml        # Foundry configuration
```

## 🚀 Getting Started

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Node.js and npm (for frontend integration)

### Setup

1. **Install dependencies** (already done):
```bash
forge install
```

2. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env and add your PRIVATE_KEY
```

## 🧪 Testing

Run all tests:
```bash
forge test
```

Run tests with verbosity:
```bash
forge test -vv
```

Run specific test contract:
```bash
forge test --match-contract MockUSDCTest -vvv
```

Run with gas reporting:
```bash
forge test --gas-report
```

## 📝 Contracts

### MockUSDC

A mock USDC token for testing purposes that mimics real USDC behavior.

**Features:**
- ✅ 6 decimals (matches real USDC)
- ✅ Initial supply: 1,000,000 USDC to deployer
- ✅ Public `mint()` function for easy testing
- ✅ Helper `mintWholeTokens()` function

**Usage Example:**

```solidity
// Deploy
MockUSDC usdc = new MockUSDC();

// Mint specific amount (with decimals)
usdc.mint(userAddress, 100_000000); // 100 USDC

// Mint whole tokens (automatically converts)
usdc.mintWholeTokens(userAddress, 100); // 100 USDC
```

## 🚀 Deployment

### Local Deployment (Anvil)

1. **Start local node:**
```bash
anvil
```

2. **Deploy to local node:**
```bash
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC --rpc-url localhost --broadcast
```

### BSC Testnet Deployment

1. **Set up .env with your private key:**
```bash
PRIVATE_KEY=your_private_key_here
```

2. **Deploy to BSC Testnet:**
```bash
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url bsc_testnet \
  --broadcast \
  --verify
```

### BSC Mainnet Deployment

⚠️ **Make sure you know what you're doing before deploying to mainnet!**

```bash
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url bsc \
  --broadcast \
  --verify
```

## 🔍 Verification

After deployment, verify your contract on BSCScan:

```bash
forge verify-contract \
  --chain-id 97 \
  --compiler-version v0.8.20 \
  --num-of-optimizations 200 \
  <CONTRACT_ADDRESS> \
  contracts/mocks/MockUSDC.sol:MockUSDC
```

## 🛠️ Useful Commands

```bash
# Build contracts
forge build

# Clean build artifacts
forge clean

# Format code
forge fmt

# Create coverage report
forge coverage

# Run static analysis
slither contracts/

# Gas snapshot
forge snapshot
```

## 📚 Integration with Frontend

After deploying MockUSDC, update the contract address in your frontend:

```typescript
// lib/contracts.ts
export const USDC_ADDRESSES = {
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // BSC Mainnet
  97: '0xYOUR_DEPLOYED_MOCKUSDC_ADDRESS', // BSC Testnet - UPDATE THIS
  31337: '0xYOUR_LOCAL_MOCKUSDC_ADDRESS', // Local Anvil
} as const
```

## 🔗 Network Details

### BSC Mainnet (Chain ID: 56)
- RPC: https://bsc-dataseed.binance.org/
- Explorer: https://bscscan.com/

### BSC Testnet (Chain ID: 97)
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545/
- Explorer: https://testnet.bscscan.com/
- Faucet: https://testnet.bnbchain.org/faucet-smart

### Local (Chain ID: 31337)
- RPC: http://127.0.0.1:8545
- Default Anvil configuration

## 🎯 Next Steps

1. **Create LucaFi Vault Contract** - Main vault for deposits and rewards
2. **Add Interest Calculation Logic** - Implement 5% weekly returns
3. **Add Access Control** - Ownable patterns for admin functions
4. **Add Emergency Functions** - Pause/unpause functionality
5. **Comprehensive Testing** - Edge cases and security tests
6. **Security Audit** - Before mainnet deployment

## 📖 Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [BSC Documentation](https://docs.bnbchain.org/)

## ⚠️ Security Notes

- Never commit your `.env` file with real private keys
- Always test on testnet before mainnet deployment
- Consider a professional audit before handling real funds
- The MockUSDC mint function should be restricted in production
- Implement proper access controls for critical functions

---

Built with ❤️ using Foundry


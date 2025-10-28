# 🚀 Quick Start - Smart Contracts

## ⚡ Super Quick Deploy to BNB Testnet

```bash
cd /home/luisca/blockchain/web3-wallet-app
make deploy-testnet
```

That's it! It will use your `dev-wallet` and deploy to BNB testnet with automatic verification.

---

## What Was Created

Your web3-wallet-app now has a complete Foundry setup with:

```
web3-wallet-app/
├── contracts/mocks/
│   └── MockUSDC.sol          ← Your mock USDC token
├── script/
│   └── DeployMockUSDC.s.sol  ← Deployment script
├── test/
│   └── MockUSDC.t.sol        ← Comprehensive tests (15 tests, all passing ✅)
├── foundry.toml               ← Foundry configuration
└── CONTRACTS_README.md        ← Detailed documentation
```

## ⚡ Quick Commands (Using Makefile)

### View All Commands
```bash
make help
```

### Test Your Contract
```bash
make test        # Run tests
make test-v      # Run with verbosity
make test-gas    # Run with gas reporting
```

### Deploy to BNB Testnet (with dev-wallet)
```bash
make deploy-testnet
```

### Deploy Locally (for testing)
```bash
# Terminal 1 - Start local blockchain
make anvil

# Terminal 2 - Deploy
make deploy-local
```

### Verify Contract (if needed)
```bash
make verify-testnet CONTRACT_ADDRESS=0xYourContractAddress
```

### Interact with Deployed Contract
```bash
# Get contract info
make contract-info CONTRACT_ADDRESS=0xYourContractAddress

# Mint tokens
make mint CONTRACT_ADDRESS=0x... TO=0xRecipientAddress AMOUNT=1000
```

### Other Useful Commands
```bash
make build       # Compile contracts
make clean       # Clean build artifacts
make format      # Format Solidity code
make coverage    # Generate coverage report
make snapshot    # Gas snapshot
```

## 🔧 Manual Deployment (Without Makefile)

<details>
<summary>Click to see manual forge commands</summary>

### Deploy to BSC Testnet
```bash
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --account dev-wallet \
  --rpc-url https://data-seed-prebsc-1-s1.binance.org:8545 \
  --broadcast \
  --verify \
  -vvv
```

### Deploy Locally
```bash
# Terminal 1
anvil

# Terminal 2
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --broadcast
```
</details>

## 📝 MockUSDC Features

- **6 decimals** (matches real USDC)
- **1,000,000 initial supply** to deployer
- **mint(address, amount)** - Mint any amount
- **mintWholeTokens(address, amount)** - Easy minting (e.g., 100 USDC)

## 🧪 Using MockUSDC in Tests

```solidity
import {MockUSDC} from "../contracts/mocks/MockUSDC.sol";

contract YourTest is Test {
    MockUSDC usdc;
    
    function setUp() public {
        usdc = new MockUSDC();
        
        // Mint 1000 USDC to test user
        address user = makeAddr("user");
        usdc.mintWholeTokens(user, 1000);
    }
}
```

## 🌐 Get BSC Testnet BNB

Need testnet BNB for gas? Get it here:
https://testnet.bnbchain.org/faucet-smart

## 📊 Test Results

All 15 tests passing ✅:
- ✅ Deployment tests
- ✅ Decimal tests (6 decimals)
- ✅ Transfer tests
- ✅ Approval tests
- ✅ Mint tests (including `mintWholeTokens`)
- ✅ Fuzz tests

## 🔗 Next Steps

1. **Test locally**: `forge test -vv`
2. **Deploy to testnet**: Follow deployment guide above
3. **Update frontend**: Add deployed address to `lib/contracts.ts`
4. **Build your vault contract**: Use MockUSDC for testing
5. **Read full docs**: Check `CONTRACTS_README.md`

## 💡 Pro Tips

```bash
# Run specific test
forge test --match-test test_Mint -vvv

# Gas reporting
forge test --gas-report

# Coverage
forge coverage

# Format code
forge fmt
```

## 🆘 Troubleshooting

**Contract won't compile?**
```bash
forge clean
forge build
```

**Tests failing?**
```bash
forge test -vvvv  # Maximum verbosity
```

**Need to reinstall dependencies?**
```bash
forge install
```

---

**Happy Building! 🎉**

For detailed documentation, see [CONTRACTS_README.md](./CONTRACTS_README.md)


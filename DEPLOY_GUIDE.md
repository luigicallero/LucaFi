# 🚀 Deploy MockUSDC to BNB Testnet

## One-Command Deploy

```bash
cd /home/luisca/blockchain/web3-wallet-app
make deploy-testnet
```

**That's it!** The Makefile will:
- ✅ Use your existing `dev-wallet`
- ✅ Deploy to BNB Testnet
- ✅ Automatically verify on BSCScan

---

## What Happens During Deployment

1. **Connects to BNB Testnet** using `dev-wallet`
2. **Deploys MockUSDC** with 1M initial supply
3. **Verifies on BSCScan** automatically
4. **Prints contract address** to console

## Requirements

### ✅ Already Set Up
- Foundry installed
- `dev-wallet` exists (checked: ✅)
- MockUSDC contract ready

### ⚠️ Need to Check
1. **BNB Balance** in your `dev-wallet`:
   ```bash
   cast balance --account dev-wallet --rpc-url https://data-seed-prebsc-1-s1.binance.org:8545
   ```

2. **Get Testnet BNB** (if needed):
   - Visit: https://testnet.bnbchain.org/faucet-smart
   - Request testnet BNB to your dev-wallet address

3. **BSCScan API Key** (optional, for verification):
   - Get key at: https://testnet.bscscan.com/myapikey
   - Add to `.env`: `BSC_API_KEY=your_key_here`
   - Note: Deployment works without this, verification might fail

## Step-by-Step First Deployment

### 1. Check Your Wallet Address
```bash
cast wallet address --account dev-wallet
```

### 2. Check BNB Balance (Need ~0.01 BNB for gas)
```bash
cast balance $(cast wallet address --account dev-wallet) --rpc-url https://data-seed-prebsc-1-s1.binance.org:8545
```

### 3. Get Testnet BNB (if balance is 0)
Visit: https://testnet.bnbchain.org/faucet-smart

### 4. Deploy!
```bash
make deploy-testnet
```

### 5. Save Your Contract Address
The deployment will print something like:
```
MockUSDC deployed at: 0x1234567890abcdef...
```

**✅ Current Deployed Address:**
```
MockUSDC (BNB Testnet): 0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2
```

View on BSCScan: https://testnet.bscscan.com/address/0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2

## After Deployment

### ✅ Frontend Already Updated!
The deployed address is already configured in `lib/contracts.ts`:

```typescript
export const USDC_ADDRESSES = {
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // BSC Mainnet
  97: '0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2', // BSC Testnet (MockUSDC) ✅
} as const
```

### Verify Deployment Worked
```bash
# Check contract info
make contract-info CONTRACT_ADDRESS=0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2
```

### Mint Some Test Tokens
```bash
# Mint 10000 USDC to an address
make mint CONTRACT_ADDRESS=0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2 TO=0xRecipientAddress AMOUNT=10000
```

## Troubleshooting

### "insufficient funds for gas"
→ Get more testnet BNB from faucet

### "failed to verify contract"
→ Deployment still succeeded! Verify manually later:
```bash
make verify-testnet CONTRACT_ADDRESS=0xYour...
```

### "account not found: dev-wallet"
→ Check wallet exists:
```bash
cast wallet list
```

### Want to see detailed logs?
The deploy command already uses `-vvv` for maximum verbosity

## Other Useful Makefile Commands

```bash
make help              # See all available commands
make test              # Run tests
make test-v            # Run tests with verbosity
make build             # Compile contracts
make deploy-local      # Deploy to local Anvil
make format            # Format Solidity code
```

## Network Info

**BNB Testnet**
- Chain ID: 97
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545
- Explorer: https://testnet.bscscan.com
- Faucet: https://testnet.bnbchain.org/faucet-smart

**Your Contract**
- Name: MockUSDC
- Symbol: USDC
- Decimals: 6
- Initial Supply: 1,000,000 USDC
- Features: Public mint for testing

---

## 🎉 Quick Summary

**To deploy:**
```bash
make deploy-testnet
```

**To interact:**
```bash
make contract-info CONTRACT_ADDRESS=0x...
make mint CONTRACT_ADDRESS=0x... TO=0x... AMOUNT=1000
```

**Need help?**
```bash
make help
```

Good luck! 🚀


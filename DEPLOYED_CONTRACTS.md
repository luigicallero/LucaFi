# 📝 Deployed Contracts

This file tracks all deployed contract addresses for the LucaFi project.

## BNB Testnet (Chain ID: 97)

### MockUSDC
- **Address:** `0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2`
- **Contract:** `MockUSDC.sol`
- **Network:** BNB Testnet
- **Explorer:** https://testnet.bscscan.com/address/0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2
- **Deployed:** October 28, 2025
- **Features:**
  - 6 decimals (matches real USDC)
  - 1,000,000 initial supply
  - Public `mint()` function for testing
  - Helper `mintWholeTokens()` function

#### Quick Contract Interactions

**View Contract Info:**
```bash
make contract-info CONTRACT_ADDRESS=0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2
```

**Mint Test Tokens:**
```bash
# Mint 1000 USDC to an address
make mint CONTRACT_ADDRESS=0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2 TO=0xYourAddress AMOUNT=1000
```

**Check Balance:**
```bash
cast call 0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2 \
  "balanceOf(address)(uint256)" 0xYourAddress \
  --rpc-url wss://bsc-testnet-rpc.publicnode.com
```

---

## BNB Mainnet (Chain ID: 56)

### Real USDC (Reference)
- **Address:** `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`
- **Note:** This is the real USDC on BSC mainnet, NOT deployed by us

---

## Contract Integration

The deployed addresses are already configured in the frontend:

**File:** `lib/contracts.ts`
```typescript
export const USDC_ADDRESSES = {
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // BSC Mainnet (Real USDC)
  97: '0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2', // BSC Testnet (MockUSDC) ✅
} as const
```

---

## Upcoming Contracts

### LucaFi Vault (To be deployed)
- **Purpose:** Main vault for deposits and 5% weekly returns
- **Status:** In development
- **Address:** TBD

---

## Verification

To verify the MockUSDC contract on BSCScan:
```bash
make verify-testnet CONTRACT_ADDRESS=0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2
```

---

## Network Details

### BNB Testnet
- **Chain ID:** 97
- **RPC:** wss://bsc-testnet-rpc.publicnode.com
- **Explorer:** https://testnet.bscscan.com
- **Faucet:** https://testnet.bnbchain.org/faucet-smart

### BNB Mainnet
- **Chain ID:** 56
- **RPC:** https://bsc-dataseed.binance.org
- **Explorer:** https://bscscan.com

---

**Last Updated:** October 28, 2025


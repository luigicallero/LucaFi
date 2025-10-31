# 🧪 Testnet Mode Documentation

## Overview

LucaFi now includes a comprehensive testnet mode that allows you to test the platform safely with test tokens before using real funds on BSC Mainnet.

## Features

### 1. Network Switcher Toggle 🔄
- **Location:** Top right corner (desktop) or below hero section (mobile)
- **Function:** Switch between BSC Mainnet (56) and BSC Testnet (97)
- **Visual Indicator:** Shows "TEST MODE" badge when on testnet

### 2. Testnet Theme 🎨
When switched to BSC Testnet, the entire application changes to a **grey color scheme** to clearly indicate you're in test mode:

**Light Mode:**
- Background: Grey gradient (light grey tones)
- Clearly distinguishable from the colorful mainnet theme

**Dark Mode:**
- Background: Darker grey gradient
- Maintains visibility while indicating test environment

### 3. Test USDC Faucet 💧

**Features:**
- Request **1,000 test USDC** with one click
- **One-time request per wallet address** (tracked in localStorage)
- Mints tokens directly from deployed MockUSDC contract
- Shows transaction status and BSCScan link

**Smart Contract:**
- Contract: `MockUSDC` at `0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2`
- Function: `mintWholeTokens(address, uint256)`
- Amount: 1,000 USDC (with 6 decimals)

**Faucet States:**
- ✅ **Not Requested:** Green button to request tokens
- ⏳ **Pending:** Shows loading spinner during transaction
- ✅ **Success:** Shows confirmation with transaction link
- 🔒 **Already Claimed:** Prevents duplicate requests

## How to Use

### Step 1: Switch to Testnet
1. Click the network toggle in the header
2. Switch from "Mainnet" to "Testnet"
3. Your wallet will prompt you to switch networks
4. Notice the grey theme activates

### Step 2: Request Test USDC
1. Connect your wallet (if not already connected)
2. Scroll to the "Test USDC Faucet" card (left column)
3. Click "💧 Request Test USDC" button
4. Approve the transaction in MetaMask
5. Wait for confirmation (~3 seconds on BSC Testnet)
6. Check your balance updates automatically

### Step 3: Test the Platform
- Deposit test USDC
- Watch interest accrue (5% after 7 days)
- Test withdrawals
- Verify all functionality works

### Step 4: Switch to Mainnet
- When ready for real funds, toggle back to Mainnet
- Theme returns to colorful gradient
- Faucet disappears (only available on testnet)

## Technical Details

### Network Detection
```typescript
const chainId = useChainId()
const isTestnet = chainId === 97 // BSC Testnet
const isMainnet = chainId === 56  // BSC Mainnet
```

### Faucet Tracking
Requests are tracked in localStorage to prevent duplicates:
```typescript
Key: `lucafi_faucet_{walletAddress}`
Data: {
  timestamp: number,
  amount: 1000,
  txHash: string
}
```

### Theme Implementation
CSS variables control the theme:
```css
.testnet-mode {
  --testnet-bg-from: #f3f4f6;
  --testnet-bg-via: #e5e7eb;
  --testnet-bg-to: #d1d5db;
}
```

## Components

### 1. NetworkSwitcher.tsx
- Toggle switch between Mainnet/Testnet
- Visual indicator for current network
- "TEST MODE" badge on testnet

### 2. TestnetFaucet.tsx
- Faucet interface for requesting test USDC
- Request tracking and duplicate prevention
- Transaction status and confirmation

### 3. TestnetWrapper.tsx
- Wraps the app to apply testnet theme
- Detects network changes
- Applies `.testnet-mode` class

## User Flow

```
┌─────────────────────┐
│  Connect Wallet     │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ Toggle to Testnet   │◄──── Grey theme activates
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ Request Test USDC   │◄──── One-time per wallet
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│  Receive 1000 USDC  │◄──── MockUSDC.mintWholeTokens()
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ Test Platform       │◄──── Deposit, earn, withdraw
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│ Switch to Mainnet   │◄──── Ready for real funds
└─────────────────────┘
```

## Security Features

✅ **Duplicate Prevention**
- LocalStorage tracking
- Wallet address validation
- One-time mint per address

✅ **Network Validation**
- Faucet only works on testnet (chain ID 97)
- Contract address validation
- Network switch prompts

✅ **Clear Visual Indicators**
- Grey theme for testnet
- "TEST MODE" badge
- Network name in UI

## Troubleshooting

### Faucet Not Showing
- **Solution:** Make sure you're on BSC Testnet (chain ID 97)
- The faucet only appears on testnet

### Can't Switch Networks
- **Solution:** Check MetaMask has BSC Testnet added
- Add manually if needed: chainlist.org

### Already Claimed Error
- **Solution:** Each wallet can only claim once
- Clear localStorage to reset (for testing only)
- Use a different wallet address

### Transaction Failing
- **Solution:** Ensure you have tBNB for gas
- Get from: https://testnet.bnbchain.org/faucet-smart

## Network Information

### BSC Testnet
- **Chain ID:** 97
- **RPC:** wss://bsc-testnet-rpc.publicnode.com
- **Explorer:** https://testnet.bscscan.com
- **Faucet (BNB):** https://testnet.bnbchain.org/faucet-smart

### BSC Mainnet
- **Chain ID:** 56
- **RPC:** https://bsc-dataseed.binance.org
- **Explorer:** https://bscscan.com

## Future Enhancements

Potential improvements:
- [ ] Admin panel to reset faucet claims
- [ ] Rate limiting (time-based)
- [ ] Faucet statistics dashboard
- [ ] Multi-network support
- [ ] Testnet data reset option

---

## Quick Reference

**Toggle Network:** Click switch in header
**Request Tokens:** Click "💧 Request Test USDC"
**Check Balance:** Automatically updates after minting
**Theme:** Grey = Testnet, Colorful = Mainnet

**Need Help?** Check the troubleshooting section or contact support.

---

Built with ❤️ for safe testing • No real funds at risk on testnet


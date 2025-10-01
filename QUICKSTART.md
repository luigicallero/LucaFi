# LucaFi Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
cd web3-wallet-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Your Browser
Navigate to: `http://localhost:3000`

### Step 4: Connect MetaMask
1. Install [MetaMask](https://metamask.io/) if you haven't already
2. Add BSC network to MetaMask (see below)
3. Click "Connect with MetaMask" button
4. Approve the connection

### Step 5: Make a Deposit
1. Switch to BSC network in MetaMask
2. Enter deposit amount (e.g., 100 USDC)
3. Click "Deposit USDC"
4. Watch your balance grow in real-time! 🎉

## 🌐 Adding BSC Network to MetaMask

### BSC Mainnet (Real USDC)
1. Open MetaMask → Networks → Add Network
2. Enter these details:
   - **Network Name**: BNB Smart Chain
   - **RPC URL**: https://bsc-dataseed.binance.org/
   - **Chain ID**: 56
   - **Currency Symbol**: BNB
   - **Block Explorer**: https://bscscan.com

### BSC Testnet (For Testing)
1. Open MetaMask → Networks → Add Network
2. Enter these details:
   - **Network Name**: BNB Smart Chain Testnet
   - **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
   - **Chain ID**: 97
   - **Currency Symbol**: tBNB
   - **Block Explorer**: https://testnet.bscscan.com

## 💰 Getting Test USDC

For BSC Testnet:
1. Get testnet BNB from [BSC Faucet](https://testnet.binance.org/faucet-smart)
2. Get testnet BUSD-T (test USDC) tokens
3. Start testing without risk!

## 🎯 What You'll See

✅ **Real-time Balance Counter** - Updates every second  
✅ **Deposit Dashboard** - Track all your deposits  
✅ **Interest Earned** - See exactly how much you've earned  
✅ **Multiple Deposits** - Make multiple deposits and track each one  
✅ **Instant Withdrawals** - Withdraw anytime with earnings  

## 📊 Interest Calculation Example

**Deposit: 100 USDC**
- After 1 second: 100.00000826719 USDC
- After 1 minute: 100.00049603 USDC
- After 1 hour: 100.02976 USDC
- After 1 day: 100.71429 USDC
- After 1 week: 105.00000 USDC (5% return!)

## ⚙️ Common Commands

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Features at a Glance

- **5% Weekly Returns** - Consistent passive income
- **Real-time Compounding** - Interest calculated every second
- **No Lock-up Period** - Withdraw anytime
- **Beautiful UI** - Modern design with dark mode
- **Mobile Responsive** - Works on all devices
- **Multi-deposit Tracking** - Manage multiple deposits

## 🔧 Troubleshooting

**"Switch to BSC Network" Warning?**
- You need to be on BSC Mainnet (56) or BSC Testnet (97)
- Open MetaMask and switch networks
- Refresh the page

**Balance Not Updating?**
- Make sure you have active deposits
- The counter updates every second automatically
- Check browser console for any errors

**Can't See USDC Balance?**
- Ensure you're on BSC network
- Check if you have USDC tokens
- In demo mode, deposits are simulated locally

**MetaMask Not Connecting?**
- Install MetaMask extension
- Unlock your wallet
- Refresh the page
- Try a different browser

## 🧪 Demo Mode

**Current Version**: Demo/Testing Mode
- ⚠️ **Deposits stored in browser localStorage** (temporary solution)
- No actual blockchain transactions yet
- Perfect for testing the UI and calculations
- Data persists per wallet address

### ⚠️ Important Limitation

Your deposit data is currently saved only in your browser's localStorage. This means:
- Data only exists in THIS browser on THIS computer
- Clearing browser cache will DELETE all deposits
- Can't access deposits from another device
- **Not production-ready** - for testing only

**Next Step**: We're planning to migrate to a cloud database (Supabase/Firebase) for permanent storage across all devices. See the "Next Steps / Pending Actions" section in the main README for details.

## 📱 Mobile Testing

To test on mobile:
1. Find your computer's IP (e.g., 192.168.1.100)
2. Start dev server: `npm run dev`
3. On mobile, open: `http://YOUR_IP:3000`
4. Use MetaMask mobile app browser

## 🎯 Next Steps

Once you're comfortable:
- Read the full README.md for detailed documentation
- Explore the code in `components/DepositCard.tsx`
- Customize the UI in `app/page.tsx`
- Adjust interest rates in `lib/contracts.ts`

## 💎 Pro Tips

1. **Start Small**: Test with small amounts first
2. **Watch the Counter**: See real-time compounding in action
3. **Multiple Deposits**: Make several deposits to see individual tracking
4. **Try Withdrawals**: Test the withdraw function to see total earnings
5. **Check Different Times**: Deposit and come back later to see growth

## 🚀 What Makes LucaFi Special?

- ⚡ **Instant Updates** - No need to refresh, balance updates live
- 📊 **Transparent** - See exactly how much you earn every second
- 🎨 **Beautiful** - Modern, intuitive interface
- 🔓 **Flexible** - No penalties for early withdrawal
- 📱 **Accessible** - Works on desktop and mobile

## ⚠️ Important Notes

- This is currently in **demo mode** for testing
- Deposits are stored locally in your browser
- No actual smart contract interactions yet
- Production version will use audited contracts
- Always verify transactions in MetaMask

---

## 🎉 Ready to Start!

Open `http://localhost:3000` and start earning with LucaFi!

Questions? Check the full README.md or open an issue.

Happy earning! 💰

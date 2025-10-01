# LucaFi - Decentralized Finance Platform

A modern DeFi application built on Binance Smart Chain where users can deposit USDC and earn 5% weekly returns with real-time compounding interest. Features a smooth chronometer-style display that updates 20 times per second for an immersive experience.

## 🌟 Features

- 🦊 **MetaMask Integration** - Seamless wallet connection
- 💰 **5% Weekly Returns** - Earn consistent passive income on USDC deposits
- ⚡ **Real-time Chronometer** - Watch your balance grow smoothly (updates 20x per second)
- 🔓 **No Lock-up Period** - Withdraw anytime without penalties
- 🌐 **BSC Network** - Fast and low-cost transactions on Binance Smart Chain
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 📊 **Live Dashboard** - Track all your deposits and earnings in real-time

## 💎 How It Works

1. **Connect your MetaMask wallet** to BSC network
2. **Deposit USDC** in any amount you choose
3. **Watch it grow** - Your balance increases every second at 5% weekly rate
4. **Withdraw anytime** with all your accumulated earnings

### Interest Calculation

- **Weekly Rate**: 5%
- **Per Second Rate**: 0.00000826719% (5% ÷ 604,800 seconds)
- **Annual APY**: ~260% with continuous compounding
- **Compounding**: Every second, automatically

Example: Deposit 100 USDC
- After 1 second: 100.00000826719 USDC
- After 1 minute: 100.00049603 USDC
- After 1 hour: 100.02976 USDC
- After 1 day: 100.71429 USDC
- After 1 week: 105.00000 USDC

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Binance Smart Chain (BSC)
- **Web3 Libraries**:
  - Wagmi v2 - React Hooks for Ethereum
  - Viem v2 - TypeScript Interface for Ethereum
  - Ethers.js v6 - Ethereum wallet implementation
  - TanStack Query v5 - Async state management

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or higher
- npm or yarn
- MetaMask browser extension ([Download here](https://metamask.io/))
- BSC network added to MetaMask
- USDC on BSC (for deposits)

## 🔧 Installation

1. Navigate to the project directory:
```bash
cd web3-wallet-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser:
```
http://localhost:3000
```

## 🌐 Network Configuration

### Adding BSC to MetaMask

**BSC Mainnet:**
- Network Name: BNB Smart Chain
- RPC URL: https://bsc-dataseed.binance.org/
- Chain ID: 56
- Currency Symbol: BNB
- Block Explorer: https://bscscan.com

**BSC Testnet:**
- Network Name: BNB Smart Chain Testnet
- RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
- Chain ID: 97
- Currency Symbol: tBNB
- Block Explorer: https://testnet.bscscan.com

## 💻 Project Structure

```
web3-wallet-app/
├── app/
│   ├── layout.tsx          # Root layout with Web3Provider
│   ├── page.tsx            # Main landing page with LucaFi interface
│   └── globals.css         # Global styles
├── components/
│   ├── Web3Provider.tsx    # Wagmi and React Query provider
│   ├── WalletConnect.tsx   # Wallet connection component
│   └── DepositCard.tsx     # Deposit interface with real-time counter
├── lib/
│   ├── wagmi.ts           # Wagmi configuration with BSC support
│   └── contracts.ts       # USDC addresses and interest calculations
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🎯 Key Components

### DepositCard
The main component that handles:
- USDC deposits and withdrawals
- Real-time balance calculations (updates every 50ms)
- Interest accumulation display with 10 decimal precision
- Deposit history tracking
- Smooth chronometer-style counter (20 updates per second)

### Interest Calculation
```typescript
// 5% per week = 0.05 / 604800 seconds
export const RATE_PER_SECOND = 0.05 / (7 * 24 * 60 * 60)

// Calculate current balance with interest
export function calculateCurrentBalance(
  depositAmount: number,
  depositTimestamp: number
): number {
  const secondsElapsed = (Date.now() - depositTimestamp) / 1000
  const interest = depositAmount * RATE_PER_SECOND * secondsElapsed
  return depositAmount + interest
}
```

## 🧪 Testing

### Demo Mode
The current version operates in **demo mode**:
- Deposits are stored in browser localStorage
- No actual blockchain transactions
- Perfect for testing the UI and interest calculations
- Data persists per wallet address

### Testing with Testnet
To test with real blockchain transactions:
1. Switch to BSC Testnet in MetaMask
2. Get testnet BNB from [BSC Faucet](https://testnet.binance.org/faucet-smart)
3. Get testnet USDC (BUSD-T) tokens
4. Make deposits and test withdrawals

## 📊 Features Breakdown

### Real-time Chronometer
- Updates every 50 milliseconds (20 times per second)
- Shows balance with 10 decimal precision
- Smooth, continuous animation like a running stopwatch
- Live indicator with pulsing dot
- Displays total earned separately
- Uses monospace font with tabular numbers for stable display

### Deposit Management
- Support for multiple deposits
- Track each deposit individually
- View deposit history with timestamps
- Calculate earnings per deposit

### User Interface
- Responsive design (mobile & desktop)
- Dark mode support
- Real-time animations
- Loading states for transactions
- Error handling and user feedback

## 🔐 Security Considerations

- Never share your seed phrase or private keys
- Start with small amounts for testing
- Verify all transaction details in MetaMask
- Demo mode stores data locally (not on blockchain)
- Production version will use audited smart contracts

## 🚧 Current Status

**Demo Mode Features:**
- ✅ Real-time interest calculations
- ✅ Multiple deposit tracking
- ✅ Withdrawal functionality
- ✅ BSC network integration
- ✅ USDC token support
- ⚠️ Local storage (no smart contract yet)

**Coming Soon:**
- 🔜 Smart contract deployment
- 🔜 Actual USDC deposits on BSC
- 🔜 On-chain transaction history
- 🔜 Admin dashboard
- 🔜 Referral system

## 🚀 Next Steps / Pending Actions

### 🎯 Priority 1: Database Integration (Critical)

**Current Issue:** Customer deposit data is currently stored in browser localStorage, which has significant limitations:
- ❌ Data is browser-specific and doesn't sync across devices
- ❌ Data can be lost if browser cache is cleared
- ❌ No backup or recovery mechanism
- ❌ Can't track users across sessions reliably
- ❌ No analytics or reporting capabilities

**Solution:** Migrate to a web database (Cloud Database)

**Recommended Options:**

1. **Supabase (PostgreSQL)** ⭐ Recommended
   - Real-time subscriptions
   - Built-in authentication
   - Row-level security
   - Free tier available
   - Easy integration with Next.js
   
2. **Firebase Firestore**
   - Real-time database
   - NoSQL structure
   - Good for rapid development
   - Google Cloud integration
   
3. **MongoDB Atlas**
   - Flexible schema
   - Great for document storage
   - Scalable
   - Free tier available

4. **Vercel Postgres**
   - Optimized for Next.js
   - Seamless Vercel deployment
   - SQL database

**Database Schema Needed:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Deposits table
CREATE TABLE deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  wallet_address VARCHAR(42) NOT NULL,
  amount DECIMAL(20, 10) NOT NULL,
  deposit_timestamp BIGINT NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active, withdrawn
  withdrawn_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table (for future blockchain integration)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deposit_id UUID REFERENCES deposits(id),
  tx_hash VARCHAR(66),
  type VARCHAR(20), -- deposit, withdraw
  amount DECIMAL(20, 10),
  status VARCHAR(20), -- pending, confirmed, failed
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Implementation Tasks:**
- [ ] Set up database service (e.g., Supabase account)
- [ ] Create database schema and tables
- [ ] Build API routes in Next.js (`/app/api/deposits/`)
- [ ] Implement authentication middleware
- [ ] Migrate localStorage logic to API calls
- [ ] Add error handling and loading states
- [ ] Implement data migration tool for existing users
- [ ] Add backup and recovery mechanisms

### 🎯 Priority 2: Smart Contract Development

**Tasks:**
- [ ] Write LucaFi vault smart contract in Solidity
- [ ] Implement deposit/withdraw functions
- [ ] Add interest calculation logic on-chain
- [ ] Write comprehensive tests (Hardhat/Foundry)
- [ ] Security audit the smart contract
- [ ] Deploy to BSC Testnet
- [ ] Deploy to BSC Mainnet
- [ ] Verify contract on BSCScan

### 🎯 Priority 3: Enhanced Features

**User Experience:**
- [ ] Add transaction history view
- [ ] Implement notification system
- [ ] Add email notifications for deposits/withdrawals
- [ ] Create user dashboard with analytics
- [ ] Add deposit/withdraw confirmation modals
- [ ] Implement loading skeletons

**Analytics & Monitoring:**
- [ ] Add Google Analytics or Mixpanel
- [ ] Implement error tracking (Sentry)
- [ ] Create admin dashboard
- [ ] Add performance monitoring
- [ ] Track user behavior and conversions

**Security:**
- [ ] Implement rate limiting
- [ ] Add CAPTCHA for sensitive actions
- [ ] Set up SSL/TLS certificates
- [ ] Implement wallet signature verification
- [ ] Add 2FA option for withdrawals
- [ ] Smart contract insurance integration

### 🎯 Priority 4: Production Readiness

**Infrastructure:**
- [ ] Set up proper environment variables
- [ ] Configure production database
- [ ] Set up CDN for static assets
- [ ] Implement caching strategy
- [ ] Set up staging environment
- [ ] Configure CI/CD pipeline

**Documentation:**
- [ ] API documentation
- [ ] Smart contract documentation
- [ ] User guide/FAQ
- [ ] Terms of service
- [ ] Privacy policy

**Testing:**
- [ ] Unit tests for all components
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Load testing
- [ ] Security penetration testing

### 📊 Estimated Timeline

- **Phase 1 - Database Migration**: 1-2 weeks
- **Phase 2 - Smart Contract**: 2-3 weeks
- **Phase 3 - Enhanced Features**: 2-3 weeks
- **Phase 4 - Production Launch**: 1-2 weeks

**Total Estimated Time**: 6-10 weeks

### 💡 Quick Start for Database Migration

To get started with Supabase integration:

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Create .env.local file
echo "NEXT_PUBLIC_SUPABASE_URL=your-project-url" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key" >> .env.local
```

## 🛠️ Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🎨 Customization

### Changing Interest Rate
Edit `lib/contracts.ts`:
```typescript
export const WEEKLY_RATE = 0.05 // Change to 0.10 for 10% weekly
```

### Adding More Networks
Edit `lib/wagmi.ts`:
```typescript
import { bsc, polygon, arbitrum } from 'wagmi/chains'

export const config = createConfig({
  chains: [bsc, polygon, arbitrum],
  // ... rest of config
})
```

## 📱 Mobile Support

LucaFi works great on mobile:
- Use MetaMask mobile app browser
- Or test on your local network using your computer's IP
- Fully responsive design
- Touch-optimized interface

## 🐛 Troubleshooting

### Wrong Network Error
- Switch to BSC Mainnet (56) or BSC Testnet (97) in MetaMask
- Refresh the page after switching

### Balance Not Updating
- Check if you have active deposits
- Verify the counter is running (should update every second)
- Try disconnecting and reconnecting wallet

### Can't Deposit
- Ensure you're on BSC network
- Check you have USDC balance
- In demo mode, deposits are simulated (no actual transaction)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [BSC Documentation](https://docs.bnbchain.org/)
- [MetaMask Documentation](https://docs.metamask.io/)

## 📞 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ by the LucaFi team using Next.js and Web3 technologies

**⚠️ Disclaimer**: This is a demo application. Always do your own research before investing in any DeFi platform.

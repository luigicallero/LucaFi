# LucaFi - Decentralized Finance Platform

A Next.js web3 wallet application with smart contract integration for DeFi operations on BNB Chain.

## 🚀 Quick Start

### Frontend Development
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Smart Contracts
```bash
# Run tests
make test

# Deploy to BNB testnet
make deploy-testnet

# View all commands
make help
```

## 📝 Deployed Contracts

### BNB Testnet (Chain ID: 97)
- **MockUSDC:** `0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2`
  - [View on BSCScan](https://testnet.bscscan.com/address/0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2)
  - 6 decimals (matches real USDC)
  - Public mint for testing

See [DEPLOYED_CONTRACTS.md](./DEPLOYED_CONTRACTS.md) for full details and interaction examples.

## 📚 Documentation

- **[QUICKSTART_CONTRACTS.md](./QUICKSTART_CONTRACTS.md)** - Smart contracts quick reference
- **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** - Step-by-step deployment guide
- **[CONTRACTS_README.md](./CONTRACTS_README.md)** - Comprehensive smart contract documentation
- **[DEPLOYED_CONTRACTS.md](./DEPLOYED_CONTRACTS.md)** - All deployed addresses & interactions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript library for Ethereum
- **TanStack Query** - Data fetching & caching
- **Tailwind CSS** - Styling

### Smart Contracts
- **Foundry** - Development framework
- **Solidity 0.8.20** - Smart contract language
- **OpenZeppelin** - Secure contract library
- **Forge** - Testing framework

## 📁 Project Structure

```
web3-wallet-app/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── DepositCard.tsx    # Main deposit interface
│   ├── WalletConnect.tsx  # Wallet connection
│   └── Web3Provider.tsx   # Web3 context provider
├── lib/                    # Utilities & config
│   ├── contracts.ts       # Contract addresses & ABIs
│   └── wagmi.ts          # Wagmi configuration
├── contracts/             # Smart contracts
│   └── mocks/
│       └── MockUSDC.sol  # Mock USDC for testing
├── test/                  # Contract tests
│   └── MockUSDC.t.sol
├── script/                # Deployment scripts
│   └── DeployMockUSDC.s.sol
├── Makefile              # Build & deployment commands
└── foundry.toml          # Foundry configuration
```

## 🧪 Testing Smart Contracts

```bash
# Run all tests
make test

# Run with verbosity
make test-v

# Run with gas reporting
make test-gas

# Generate coverage report
make coverage
```

All 15 tests passing ✅

## 🚢 Deployment

### Local Development
```bash
# Terminal 1 - Start local blockchain
make anvil

# Terminal 2 - Deploy contracts
make deploy-local
```

### BNB Testnet
```bash
make deploy-testnet
```

Uses your `dev-wallet` automatically. See [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) for details.

## 🔗 Network Configuration

### BNB Testnet
- **Chain ID:** 97
- **RPC:** wss://bsc-testnet-rpc.publicnode.com
- **Explorer:** https://testnet.bscscan.com
- **Faucet:** https://testnet.bnbchain.org/faucet-smart

### BNB Mainnet
- **Chain ID:** 56
- **RPC:** https://bsc-dataseed.binance.org
- **Explorer:** https://bscscan.com

## 🔧 Available Make Commands

```bash
make help              # Show all available commands
make build             # Compile smart contracts
make test              # Run tests
make deploy-testnet    # Deploy to BNB testnet
make deploy-local      # Deploy to local Anvil
make format            # Format Solidity code
make clean             # Clean build artifacts
make contract-info     # Get deployed contract info
```

## 📖 Foundry Documentation

Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

Foundry consists of:
- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools)
- **Cast**: Swiss army knife for interacting with EVM smart contracts
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network
- **Chisel**: Fast, utilitarian, and verbose solidity REPL

Learn more: https://book.getfoundry.sh/

## 🤝 Contributing

This is a personal project, but feel free to fork and modify for your own use.

## 📄 License

MIT

---

Built with ❤️ using Next.js, Foundry, and BNB Chain

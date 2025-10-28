-include .env

# Phony targets (not actual files)
.PHONY: help build test clean deploy-local deploy-testnet deploy-testnet-verify verify-testnet install update format coverage

# Default target - show help
help:
	@echo "Available commands:"
	@echo "  make build           - Compile smart contracts"
	@echo "  make test            - Run all tests"
	@echo "  make test-v          - Run tests with verbosity"
	@echo "  make coverage        - Generate coverage report"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make deploy-local    - Deploy to local Anvil (start anvil first)"
	@echo "  make deploy-testnet  - Deploy MockUSDC to BNB testnet using dev-wallet"
	@echo "  make deploy-testnet-verify - Deploy + auto-verify (needs BSC_API_KEY in .env)"
	@echo "  make verify-testnet  - Verify contract on BSCScan testnet (after deployment)"
	@echo "  make format          - Format Solidity code"
	@echo "  make install         - Install dependencies"

# Default Anvil private key (first account)
DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Network configurations
BSC_TESTNET_RPC := wss://bsc-testnet-rpc.publicnode.com
BSC_TESTNET_CHAIN_ID := 97

# Deployed contract addresses (for reference)
MOCKUSDC_TESTNET := 0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2

# Build contracts
build:
	@echo "Building contracts..."
	@forge build

# Run tests
test:
	@echo "Running tests..."
	@forge test

# Run tests with verbosity
test-v:
	@forge test -vv

# Run tests with gas reporting
test-gas:
	@forge test --gas-report

# Generate coverage report
coverage:
	@forge coverage

# Clean build artifacts
clean:
	@forge clean

# Format Solidity code
format:
	@forge fmt

# Install/update dependencies
install:
	@forge install

update:
	@forge update

# Start local Anvil node
anvil:
	@echo "Starting Anvil local blockchain..."
	@anvil

# Deploy to local Anvil (make sure anvil is running first)
deploy-local:
	@echo "Deploying MockUSDC to local Anvil..."
	@forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
		--rpc-url http://localhost:8545 \
		--private-key $(DEFAULT_ANVIL_KEY) \
		--broadcast \
		-vvv

# Deploy to BNB testnet using dev-wallet
deploy-testnet:
	@echo "Deploying MockUSDC to BNB Testnet..."
	@forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
		--account dev-wallet \
		--rpc-url $(BSC_TESTNET_RPC) \
		--broadcast \
		-vvv
	@echo ""
	@echo "✅ Deployment complete!"
	@echo "💡 To verify on BSCScan, run: make verify-testnet CONTRACT_ADDRESS=0xYourAddress"

# Deploy to BNB testnet with automatic verification (requires BSC_API_KEY in .env)
deploy-testnet-verify:
	@echo "Deploying MockUSDC to BNB Testnet with verification..."
	@forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
		--account dev-wallet \
		--rpc-url $(BSC_TESTNET_RPC) \
		--broadcast \
		--verify \
		--etherscan-api-key $(BSC_API_KEY) \
		-vvv

# Verify contract on BSCScan testnet (if not auto-verified during deployment)
# Usage: make verify-testnet CONTRACT_ADDRESS=0x...
verify-testnet:
	@echo "Verifying MockUSDC on BSCScan Testnet..."
	@forge verify-contract \
		--chain-id $(BSC_TESTNET_CHAIN_ID) \
		--watch \
		--etherscan-api-key $(BSC_API_KEY) \
		--compiler-version v0.8.20+commit.a1b79de6 \
		$(CONTRACT_ADDRESS) \
		contracts/mocks/MockUSDC.sol:MockUSDC

# Interactive contract interaction (example)
# Get balance: make call-balance ADDRESS=0x...
call-balance:
	@cast call $(CONTRACT_ADDRESS) "balanceOf(address)(uint256)" $(ADDRESS) \
		--rpc-url $(BSC_TESTNET_RPC)

# Mint tokens: make mint TO=0x... AMOUNT=1000
mint:
	@cast send $(CONTRACT_ADDRESS) "mintWholeTokens(address,uint256)" $(TO) $(AMOUNT) \
		--account dev-wallet \
		--rpc-url $(BSC_TESTNET_RPC)

# Get contract info
contract-info:
	@echo "Getting MockUSDC info..."
	@echo "Name:"
	@cast call $(CONTRACT_ADDRESS) "name()(string)" --rpc-url $(BSC_TESTNET_RPC)
	@echo "Symbol:"
	@cast call $(CONTRACT_ADDRESS) "symbol()(string)" --rpc-url $(BSC_TESTNET_RPC)
	@echo "Decimals:"
	@cast call $(CONTRACT_ADDRESS) "decimals()(uint8)" --rpc-url $(BSC_TESTNET_RPC)
	@echo "Total Supply:"
	@cast call $(CONTRACT_ADDRESS) "totalSupply()(uint256)" --rpc-url $(BSC_TESTNET_RPC)

# Snapshot gas usage
snapshot:
	@forge snapshot

# Run Slither (if installed)
slither:
	@slither contracts/ --config-file slither.config.json || echo "Slither not installed. Run: pip install slither-analyzer"


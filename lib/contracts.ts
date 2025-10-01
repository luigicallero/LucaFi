// USDC Token Addresses
export const USDC_ADDRESSES = {
  // BSC Mainnet USDC
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as `0x${string}`,
  // BSC Testnet USDC (using BUSD-T for testing)
  97: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' as `0x${string}`,
} as const

// ERC20 ABI for USDC interactions
export const ERC20_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// LucaFi Vault Address (mock for now - would be your deployed contract)
export const LUCAFI_VAULT_ADDRESS = '0x0000000000000000000000000000000000000001' as `0x${string}`

// Calculate 5% per week interest rate per second
// 5% per week = 0.05 / (7 * 24 * 60 * 60) per second
// Updates every 50ms (20 times per second) for smooth chronometer effect
export const WEEKLY_RATE = 0.05 // 5%
export const SECONDS_PER_WEEK = 7 * 24 * 60 * 60 // 604800 seconds
export const RATE_PER_SECOND = WEEKLY_RATE / SECONDS_PER_WEEK // ~0.00000008267195767 per second

// Calculate current balance with interest
export function calculateCurrentBalance(
  depositAmount: number,
  depositTimestamp: number
): number {
  const now = Date.now()
  const secondsElapsed = (now - depositTimestamp) / 1000
  const interest = depositAmount * RATE_PER_SECOND * secondsElapsed
  return depositAmount + interest
}


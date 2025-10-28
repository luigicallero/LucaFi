// USDC Token Addresses
export const USDC_ADDRESSES = {
  // BSC Mainnet USDC
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as `0x${string}`,
  // BSC Testnet MockUSDC (deployed)
  97: '0xC6A85B25a7f58E665185CEB0c3fD0f61e7E8Cea2' as `0x${string}`,
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

// Calculate 5% per week interest rate
// Interest only applies after 7 days (7-day lock period for profit withdrawal)
export const WEEKLY_RATE = 0.05 // 5%
export const DAYS_TO_UNLOCK = 7 // Days before profit can be withdrawn
export const SECONDS_PER_WEEK = 7 * 24 * 60 * 60 // 604800 seconds
export const RATE_PER_SECOND = WEEKLY_RATE / SECONDS_PER_WEEK // ~0.00000008267195767 per second

// Calculate current balance with interest (only after 7 days)
export function calculateCurrentBalance(
  depositAmount: number,
  depositTimestamp: number
): number {
  const now = Date.now()
  const secondsElapsed = (now - depositTimestamp) / 1000
  const daysElapsed = secondsElapsed / 86400 // 86400 seconds per day
  
  // No interest until 7 days have passed
  if (daysElapsed < DAYS_TO_UNLOCK) {
    return depositAmount
  }
  
  // After 7 days, apply 5% interest
  const interest = depositAmount * WEEKLY_RATE
  return depositAmount + interest
}


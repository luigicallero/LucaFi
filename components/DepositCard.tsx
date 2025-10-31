'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { USDC_ADDRESSES, ERC20_ABI, calculateCurrentBalance, RATE_PER_SECOND } from '@/lib/contracts'

interface Deposit {
  amount: number
  timestamp: number
}

export function DepositCard() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [depositAmount, setDepositAmount] = useState('')
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [currentBalance, setCurrentBalance] = useState(0)
  const [isApproving, setIsApproving] = useState(false)
  const [mounted, setMounted] = useState(false)

  const usdcAddress = USDC_ADDRESSES[chainId as keyof typeof USDC_ADDRESSES]
  const isBSC = chainId === 56 || chainId === 97
  const USDC_DECIMALS = 6 // USDC uses 6 decimals, not 18

  // Read USDC balance
  const { data: usdcBalance } = useReadContract({
    address: usdcAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!usdcAddress,
    },
  })

  // Write contract hooks
  const { writeContract: approveWrite, data: approveHash } = useWriteContract()
  const { writeContract: depositWrite, data: depositHash } = useWriteContract()

  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  })

  const { isLoading: isDepositLoading } = useWaitForTransactionReceipt({
    hash: depositHash,
  })

  useEffect(() => {
    setMounted(true)
    // Load deposits from localStorage (network-specific)
    // TODO: MIGRATE TO DATABASE - Currently using localStorage as temporary solution
    // This should be replaced with API calls to Supabase/Firebase for production
    // See README "Next Steps / Pending Actions" section for migration plan
    if (typeof window !== 'undefined' && address && chainId) {
      const networkName = chainId === 97 ? 'testnet' : chainId === 56 ? 'mainnet' : 'unknown'
      const stored = localStorage.getItem(`lucafi_deposits_${address}_${networkName}`)
      if (stored) {
        setDeposits(JSON.parse(stored))
      } else {
        setDeposits([]) // Clear deposits when switching networks
      }
    }
  }, [address, chainId])

  // Update balance (recalculates when deposits change or every minute)
  useEffect(() => {
    if (deposits.length === 0) {
      setCurrentBalance(0)
      return
    }

    const updateBalance = () => {
      const total = deposits.reduce((sum, deposit) => {
        return sum + calculateCurrentBalance(deposit.amount, deposit.timestamp)
      }, 0)
      setCurrentBalance(total)
    }

    updateBalance()
    // Update every minute to check if 7 days have passed
    const interval = setInterval(updateBalance, 60000)

    return () => clearInterval(interval)
  }, [deposits])

  const handleApprove = async () => {
    if (!depositAmount || !usdcAddress) return
    
    setIsApproving(true)
    try {
      const amount = parseUnits(depositAmount, USDC_DECIMALS)
      approveWrite({
        address: usdcAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [address!, amount],
      })
    } catch (error) {
      console.error('Approval error:', error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleDeposit = () => {
    if (!depositAmount) return
    
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) return

    const newDeposit: Deposit = {
      amount,
      timestamp: Date.now(),
    }

    const updatedDeposits = [...deposits, newDeposit]
    setDeposits(updatedDeposits)
    
    // Save to localStorage (TEMPORARY - TODO: Replace with database API call)
    // In production, this should POST to /api/deposits endpoint
    // Deposits are saved per network (testnet/mainnet)
    if (typeof window !== 'undefined' && address && chainId) {
      const networkName = chainId === 97 ? 'testnet' : chainId === 56 ? 'mainnet' : 'unknown'
      localStorage.setItem(`lucafi_deposits_${address}_${networkName}`, JSON.stringify(updatedDeposits))
    }

    setDepositAmount('')
  }

  const handleWithdraw = () => {
    if (deposits.length === 0) return
    
    // Clear all deposits (TEMPORARY - TODO: Replace with database API call)
    // In production, this should DELETE via /api/deposits endpoint
    // Clear deposits for current network only
    setDeposits([])
    if (typeof window !== 'undefined' && address && chainId) {
      const networkName = chainId === 97 ? 'testnet' : chainId === 56 ? 'mainnet' : 'unknown'
      localStorage.removeItem(`lucafi_deposits_${address}_${networkName}`)
    }
    setCurrentBalance(0)
  }

  const totalDeposited = deposits.reduce((sum, d) => sum + d.amount, 0)
  const totalEarned = currentBalance - totalDeposited
  const weeklyRate = 5 // 5% per week

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  if (!mounted) return null

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please connect your wallet to start depositing USDC
        </p>
      </div>
    )
  }

  if (!isBSC) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          Switch to BSC Network
        </h3>
        <p className="text-yellow-800 dark:text-yellow-300 mb-4">
          LucaFi operates on Binance Smart Chain. Please switch your network in MetaMask.
        </p>
        <div className="text-sm text-yellow-700 dark:text-yellow-400">
          Supported: BSC Mainnet (56) or BSC Testnet (97)
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Balance Card */}
      <div className={`p-8 rounded-2xl border-2 shadow-xl transition-colors duration-500 ${
        chainId === 97 
          ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-400 dark:border-gray-600' 
          : 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border-green-300 dark:border-green-700'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Your Balance</h3>
            {chainId === 97 && (
              <span className="text-xs bg-orange-200 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded font-medium">
                Test Mode
              </span>
            )}
          </div>
          <span className={`text-sm px-3 py-1 rounded-full font-medium transition-colors ${
            chainId === 97
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
          }`}>
            {weeklyRate}% Weekly
          </span>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-mono tabular-nums break-all">
              {formatNumber(currentBalance)}
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 flex-shrink-0">
              USDC
            </span>
          </div>
          {totalEarned > 0 && (
            <div className="text-sm text-green-600 dark:text-green-400 font-medium font-mono">
              + {formatNumber(totalEarned)} USDC earned
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Deposited</div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words">
              {formatNumber(totalDeposited)} USDC
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Weekly Rate</div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {weeklyRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Deposit USDC
        </h3>
        
        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Your USDC Balance: {usdcBalance ? formatNumber(parseFloat(formatUnits(usdcBalance as bigint, USDC_DECIMALS))) : '0.00'} USDC
          </label>
          <div className="relative">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              step="0.01"
              min="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
              USDC
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[10, 50, 100, 500].map((amount) => (
            <button
              key={amount}
              onClick={() => setDepositAmount(amount.toString())}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
            >
              {amount} USDC
            </button>
          ))}
        </div>

        <button
          onClick={handleDeposit}
          disabled={!depositAmount || parseFloat(depositAmount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
        >
          {isDepositLoading ? 'Depositing...' : 'Deposit USDC'}
        </button>

        {deposits.length > 0 && (
          <button
            onClick={handleWithdraw}
            className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Withdraw All ({formatNumber(currentBalance)} USDC)
          </button>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <div className="text-blue-600 dark:text-blue-400 mt-0.5">ℹ️</div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="space-y-1 text-xs">
                <li>• Earn 5% after 7 days on your USDC deposits</li>
                <li>• Withdraw capital anytime, profits available after 7 days</li>
                <li>• After 7 days: withdraw capital only, profit only, or both</li>
                <li>• Currently in demo mode - deposits stored locally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Active Deposits */}
      {deposits.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Active Deposits ({deposits.length})
            </h3>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {chainId === 97 ? '🧪 Testnet' : '🟢 Mainnet'}
            </span>
          </div>
          <div className="space-y-3">
            {deposits.map((deposit, index) => {
              const current = calculateCurrentBalance(deposit.amount, deposit.timestamp)
              const earned = current - deposit.amount
              const timeElapsed = Math.floor((Date.now() - deposit.timestamp) / 1000)
              const days = Math.floor(timeElapsed / 86400)
              const hours = Math.floor((timeElapsed % 86400) / 3600)
              const minutes = Math.floor((timeElapsed % 3600) / 60)

              return (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Deposit #{index + 1}</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words">
                        {formatNumber(deposit.amount)} USDC
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
                      <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400 font-mono tabular-nums break-words">
                        {formatNumber(current)} USDC
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="text-green-600 dark:text-green-400 font-medium font-mono tabular-nums">
                      +{formatNumber(earned)} USDC earned
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {days > 0 && `${days}d `}{hours}h {minutes}m ago
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}


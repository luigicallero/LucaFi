'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi'
import { parseUnits } from 'viem'
import { USDC_ADDRESSES } from '@/lib/contracts'

const FAUCET_AMOUNT = 1000 // 1000 USDC
const USDC_DECIMALS = 6

// ABI for MockUSDC mintWholeTokens function
const MOCK_USDC_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amountInWholeTokens", "type": "uint256" }
    ],
    "name": "mintWholeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export function TestnetFaucet() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [mounted, setMounted] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const usdcAddress = USDC_ADDRESSES[chainId as keyof typeof USDC_ADDRESSES]
  const isTestnet = chainId === 97

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user has already requested tokens
  useEffect(() => {
    if (address && typeof window !== 'undefined') {
      const key = `lucafi_faucet_${address.toLowerCase()}`
      const requestData = localStorage.getItem(key)
      if (requestData) {
        const data = JSON.parse(requestData)
        setHasRequested(true)
        setLastRequestTime(data.timestamp)
      }
    }
  }, [address])

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess && address) {
      // Mark as requested in localStorage
      const key = `lucafi_faucet_${address.toLowerCase()}`
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        amount: FAUCET_AMOUNT,
        txHash: hash
      }))
      setHasRequested(true)
      setLastRequestTime(Date.now())
      setIsRequesting(false)
    }
  }, [isSuccess, address, hash])

  if (!mounted) return null

  // Only show on testnet
  if (!isTestnet) return null

  if (!isConnected) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
        <div className="text-3xl mb-3">💧</div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Test USDC Faucet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect your wallet to request test USDC
        </p>
      </div>
    )
  }

  const handleRequest = async () => {
    if (!address || !usdcAddress || hasRequested) return
    
    setIsRequesting(true)
    try {
      writeContract({
        address: usdcAddress,
        abi: MOCK_USDC_ABI,
        functionName: 'mintWholeTokens',
        args: [address, BigInt(FAUCET_AMOUNT)],
      })
    } catch (error) {
      console.error('Faucet request error:', error)
      setIsRequesting(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">💧</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Test USDC Faucet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get {FAUCET_AMOUNT} test USDC for testing
          </p>
        </div>
      </div>

      {hasRequested ? (
        <div className="space-y-3">
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                  You've already received test USDC
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Requested: {lastRequestTime ? formatDate(lastRequestTime) : 'Unknown'}
                </p>
                {hash && (
                  <a
                    href={`https://testnet.bscscan.com/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 dark:text-green-400 hover:underline mt-1 inline-block"
                  >
                    View transaction ↗
                  </a>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Each wallet can request tokens once. Need more? Contact support.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">You will receive:</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {FAUCET_AMOUNT.toLocaleString()} USDC
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Test tokens • No real value • One-time request per wallet
            </p>
          </div>

          <button
            onClick={handleRequest}
            disabled={isPending || isConfirming || isRequesting}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
          >
            {isPending || isRequesting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Requesting...
              </span>
            ) : isConfirming ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirming...
              </span>
            ) : (
              '💧 Request Test USDC'
            )}
          </button>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              ℹ️ <strong>Note:</strong> This is a one-time faucet per wallet address. The tokens have no real value and are only for testing the LucaFi platform.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


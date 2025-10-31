'use client'

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useReadContract } from 'wagmi'
import { formatEther, formatUnits } from 'viem'
import { useEffect, useState } from 'react'
import { USDC_ADDRESSES, ERC20_ABI } from '@/lib/contracts'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const USDC_DECIMALS = 6

  const usdcAddress = USDC_ADDRESSES[chainId as keyof typeof USDC_ADDRESSES]
  const isTestnet = chainId === 97

  // Get native balance (BNB/ETH)
  const { data: nativeBalance } = useBalance({
    address: address,
  })

  // Get USDC balance
  const { data: usdcBalance } = useReadContract({
    address: usdcAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!usdcAddress,
    },
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getChainName = (id: number) => {
    switch(id) {
      case 1: return 'Ethereum Mainnet'
      case 11155111: return 'Sepolia'
      case 137: return 'Polygon'
      case 56: return 'BSC Mainnet'
      case 97: return 'BSC Testnet'
      default: return `Chain ID: ${id}`
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isConnected ? (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="mb-6">
              <svg 
                className="w-20 h-20 mx-auto text-blue-600 dark:text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect with MetaMask to view your balance and interact with Web3
            </p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5S1.5 6.201 1.5 12 6.201 22.5 12 22.5 22.5 17.799 22.5 12zm-10.5 9c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9z"/>
                </svg>
                Connect with {connector.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Account Info Card */}
          <div className={`p-8 rounded-2xl shadow-xl transition-colors duration-500 ${
            isTestnet 
              ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-600' 
              : 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg 
                  className={`w-8 h-8 transition-colors ${
                    isTestnet 
                      ? 'text-gray-600 dark:text-gray-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Connected
                {isTestnet && (
                  <span className="text-xs bg-orange-200 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full font-medium">
                    TEST MODE
                  </span>
                )}
              </h2>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
            
            {/* Wallet Address */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
                Wallet Address
              </label>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{formatAddress(address!)}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(address!)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Copy address"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Network */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
                Network
              </label>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white font-medium">{getChainName(chainId)}</span>
              </div>
            </div>

            {/* Balance Display */}
            <div className="mt-6 space-y-4">
              {/* USDC Balance */}
              {usdcAddress && (
                <div className={`p-6 bg-white dark:bg-gray-900 rounded-xl border-2 transition-colors ${
                  isTestnet
                    ? 'border-gray-400 dark:border-gray-600'
                    : 'border-green-300 dark:border-green-700'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      USDC Balance
                    </label>
                    {isTestnet && (
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                        Test Tokens
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white font-mono tabular-nums break-all">
                      {usdcBalance ? formatNumber(parseFloat(formatUnits(usdcBalance as bigint, USDC_DECIMALS))) : '0.00'}
                    </span>
                    <span className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 flex-shrink-0">
                      USDC
                    </span>
                  </div>
                </div>
              )}
              
              {/* Native Balance (BNB/ETH) */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                  Native Balance ({nativeBalance?.symbol || 'ETH'})
                </label>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300 font-mono tabular-nums">
                    {nativeBalance ? parseFloat(formatEther(nativeBalance.value)).toFixed(4) : '0.0000'}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {nativeBalance?.symbol || 'ETH'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">🔐</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Secure Connection</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Web3 Ready</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-2">🦊</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">MetaMask Connected</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


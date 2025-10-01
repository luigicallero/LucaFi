'use client'

import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi'
import { formatEther } from 'viem'
import { useEffect, useState } from 'react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address: address,
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
      default: return `Chain ID: ${id}`
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
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
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 p-8 rounded-2xl border border-green-200 dark:border-green-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg 
                  className="w-8 h-8 text-green-600 dark:text-green-400" 
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
            <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl border-2 border-green-300 dark:border-green-700">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 block">
                Your Balance
              </label>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {balance ? parseFloat(formatEther(balance.value)).toFixed(6) : '0.000000'}
                </span>
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                  {balance?.symbol || 'ETH'}
                </span>
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


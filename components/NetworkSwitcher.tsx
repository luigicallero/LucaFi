'use client'

import { useChainId, useSwitchChain } from 'wagmi'
import { useEffect, useState } from 'react'

export function NetworkSwitcher() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isTestnet = chainId === 97
  const isBSC = chainId === 56 || chainId === 97

  const handleToggle = () => {
    if (isTestnet) {
      // Switch to BSC Mainnet
      switchChain({ chainId: 56 })
    } else {
      // Switch to BSC Testnet
      switchChain({ chainId: 97 })
    }
  }

  // Don't show if not on BSC network
  if (!isBSC && chainId !== undefined) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800 rounded-lg p-3">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
          ⚠️ Please switch to BSC Mainnet or Testnet
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${!isTestnet ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
          Mainnet
        </span>
        
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isTestnet 
              ? 'bg-orange-500' 
              : 'bg-green-600'
          }`}
          aria-label="Toggle network"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              isTestnet ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>

        <span className={`text-sm font-medium ${isTestnet ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}`}>
          Testnet
        </span>
      </div>

      {isTestnet && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
          <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
            🧪 TEST MODE
          </span>
        </div>
      )}
    </div>
  )
}


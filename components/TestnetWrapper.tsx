'use client'

import { useChainId } from 'wagmi'
import { useEffect, useState, ReactNode } from 'react'

interface TestnetWrapperProps {
  children: ReactNode
}

export function TestnetWrapper({ children }: TestnetWrapperProps) {
  const chainId = useChainId()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isTestnet = mounted && chainId === 97

  return (
    <div className={isTestnet ? 'testnet-mode' : ''} suppressHydrationWarning>
      {children}
    </div>
  )
}


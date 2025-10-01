import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon, bsc, bscTestnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bsc, bscTestnet, mainnet, sepolia, polygon],
  connectors: [
    injected({ target: 'metaMask' }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createPublicClient, http } from 'viem'

const queryClient = new QueryClient()

const CHILIZ_RPC = ''
const projectId = ''

export const client = createPublicClient({
  transport: http(CHILIZ_RPC),
})

const metadata = {
  name: 'Socios Only DApp',
  description: 'DApp pour Socios uniquement',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

const SOCIOS_WALLET_ID =
  ''

const chilizNetwork = {
  id: 1776,
  name: 'Chiliz Chain',
  network: 'chiliz',
  rpcUrls: {
    default: CHILIZ_RPC,
  },
  nativeCurrency: {
    name: 'Chiliz Token',
    symbol: 'CHZ',
    decimals: 18,
  },
  testnet: false,
}

const wagmiAdapter = new WagmiAdapter({
  networks: [chilizNetwork],
  projectId,
  ssr: true,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [chilizNetwork],
  projectId,
  metadata,
  featuredWalletIds: [SOCIOS_WALLET_ID],
  walletIds: [SOCIOS_WALLET_ID],
  features: {
    analytics: false,
    email: false,
    socials: []
  },
})

function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </React.StrictMode>
)

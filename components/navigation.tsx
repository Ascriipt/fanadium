"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ShoppingBag, User, Wallet, LogIn, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useAppKitAccount } from "@reown/appkit/react"
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createPublicClient, http } from 'viem'

const queryClient = new QueryClient()

const CHILIZ_RPC = process.env.NEXT_PUBLIC_CHILIZ_RPC
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
const SOCIOS_WALLET_ID = process.env.NEXT_PUBLIC_SOCIOS_WALLET_ID

declare namespace JSX {
  interface IntrinsicElements {
    'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}

const metadata = {
  name: 'Socios Only DApp',
  description: 'DApp pour Socios uniquement',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

export const chilizNetwork = {
  id: 88882,
  name: 'Chiliz Chain',
  network: 'chiliz',
  rpcUrls: {
    default: {
      http: [CHILIZ_RPC],
    },
    public: {
      http: [CHILIZ_RPC],
    },
  },
  nativeCurrency: {
    name: 'Chiliz',
    symbol: 'CHZ',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Chiliz Explorer',
      url: 'https://testnet.chiliscan.com/',
    },
  },
  testnet: true,
} as const satisfies Chain

export const client = createPublicClient({
  chain: chilizNetwork,
  transport: http(CHILIZ_RPC),
})

const wagmiAdapter = new WagmiAdapter({
  networks: [chilizNetwork],
  projectId: PROJECT_ID,
  ssr: true,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [chilizNetwork],
  projectId: PROJECT_ID,
  metadata,
  featuredWalletIds: [SOCIOS_WALLET_ID],
  walletIds: [SOCIOS_WALLET_ID],
  features: {
    analytics: false,
    email: false,
    socials: []
  },
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export function Navigation() {
  const [isConnected, setIsConnected] = useState(false)
  const { address } = useAppKitAccount()


  useEffect(() => {
    if (address) {
      console.log("Wallet connected:", address)
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [address])

  const connectWallet = () => {
    setIsConnected(true)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">fd</span>
            </div>
            <span className="text-white font-bold text-xl">fanadium</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/events" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <appkit-button />

            {/* 👤 Profile Icon */}
            <div className="text-gray-300 hover:text-white">
              <Link href="/profile" className="block text-gray-300 hover:text-white transition-colors py-2">
                <User className="w-4 h-4 mr-2" />
              </Link>
            </div>

            {/* 🔔 Notification Icon with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  {/* Notification dot */}
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-ping" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-black text-white border border-purple-500/20">
                <DropdownMenuItem
                  onClick={() => alert("Claim your Wimbledon 2025 NFT")}
                  className="cursor-pointer hover:bg-purple-700/20"
                >
                  🎾 Claim your Wimbledon 2025 NFT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

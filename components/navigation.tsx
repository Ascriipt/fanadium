"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet, User, Calendar, ShoppingBag, LogIn } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

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
            <Link
              href="/marketplace"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={connectWallet} className="text-gray-300 hover:text-white">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <div className="text-gray-300 hover:text-white">
              <User className="w-4 h-4 mr-2" />
              <Link href="/profile">Profile</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-purple-500/20">
            <Link
              href="/marketplace"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/events"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/profile"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <div className="pt-4 space-y-2">
              {!isConnected && (
                <Button
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

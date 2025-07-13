"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, Eye, ShoppingCart, TrendingUp, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const nfts = [
    {
      id: 1,
      title: "Legendary Goal Moment",
      price: "150 CHZ",
      priceUSD: "$45.00",
      image: "/placeholder.svg?height=250&width=250",
      creator: "SportsMoments",
      owner: "CryptoFan123",
      rarity: "Legendary",
      likes: 234,
      views: 1200,
      category: "Football",
      createdAt: "2024-01-15",
      isVerified: true,
      isHot: true,
    },
    {
      id: 2,
      title: "Victory Celebration",
      price: "89 CHZ",
      priceUSD: "$26.70",
      image: "/placeholder.svg?height=250&width=250",
      creator: "EsportsArt",
      owner: "GameCollector",
      rarity: "Epic",
      likes: 156,
      views: 890,
      category: "Esports",
      createdAt: "2024-01-20",
      isVerified: true,
      isHot: false,
    },
    {
      id: 3,
      title: "Championship Trophy",
      price: "200 CHZ",
      priceUSD: "$60.00",
      image: "/placeholder.svg?height=250&width=250",
      creator: "TrophyCollector",
      owner: "SportsFan456",
      rarity: "Legendary",
      likes: 345,
      views: 1500,
      category: "Basketball",
      createdAt: "2024-01-10",
      isVerified: false,
      isHot: true,
    },
    {
      id: 4,
      title: "Racing Victory",
      price: "120 CHZ",
      priceUSD: "$36.00",
      image: "/placeholder.svg?height=250&width=250",
      creator: "SpeedArt",
      owner: "RacingFan",
      rarity: "Epic",
      likes: 198,
      views: 1100,
      category: "Racing",
      createdAt: "2024-01-25",
      isVerified: true,
      isHot: false,
    },
    {
      id: 5,
      title: "Tennis Ace",
      price: "75 CHZ",
      priceUSD: "$22.50",
      image: "/placeholder.svg?height=250&width=250",
      creator: "CourtMaster",
      owner: "TennisLover",
      rarity: "Rare",
      likes: 87,
      views: 650,
      category: "Tennis",
      createdAt: "2024-02-01",
      isVerified: true,
      isHot: false,
    },
    {
      id: 6,
      title: "Olympic Glory",
      price: "300 CHZ",
      priceUSD: "$90.00",
      image: "/placeholder.svg?height=250&width=250",
      creator: "OlympicArt",
      owner: "GoldMedalist",
      rarity: "Legendary",
      likes: 456,
      views: 2100,
      category: "Olympics",
      createdAt: "2024-01-05",
      isVerified: true,
      isHot: true,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "football", label: "Football" },
    { value: "esports", label: "Esports" },
    { value: "basketball", label: "Basketball" },
    { value: "racing", label: "Racing" },
    { value: "tennis", label: "Tennis" },
    { value: "olympics", label: "Olympics" },
  ]

  const rarities = [
    { value: "all", label: "All Rarities" },
    { value: "common", label: "Common" },
    { value: "rare", label: "Rare" },
    { value: "epic", label: "Epic" },
    { value: "legendary", label: "Legendary" },
  ]

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "0 - 50 CHZ" },
    { value: "50-100", label: "50 - 100 CHZ" },
    { value: "100-200", label: "100 - 200 CHZ" },
    { value: "200+", label: "200+ CHZ" },
  ]

  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch =
      nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterBy === "all" || nft.category.toLowerCase() === filterBy.toLowerCase()

    const matchesPrice =
      priceRange === "all" ||
      (() => {
        const price = Number.parseInt(nft.price.split(" ")[0])
        switch (priceRange) {
          case "0-50":
            return price <= 50
          case "50-100":
            return price > 50 && price <= 100
          case "100-200":
            return price > 100 && price <= 200
          case "200+":
            return price > 200
          default:
            return true
        }
      })()

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseInt(a.price.split(" ")[0]) - Number.parseInt(b.price.split(" ")[0])
      case "price-high":
        return Number.parseInt(b.price.split(" ")[0]) - Number.parseInt(a.price.split(" ")[0])
      case "popular":
        return b.likes - a.likes
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent mb-4">
            NFT Marketplace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover, buy, and sell exclusive sports and esports NFTs on the Chiliz blockchain
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search NFTs, creators, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
              />
            </div>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/20">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-gray-300 hover:text-white">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/20">
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value} className="text-gray-300 hover:text-white">
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-sm border-purple-500/20">
                <SelectItem value="newest" className="text-gray-300 hover:text-white">
                  Newest
                </SelectItem>
                <SelectItem value="popular" className="text-gray-300 hover:text-white">
                  Most Popular
                </SelectItem>
                <SelectItem value="price-low" className="text-gray-300 hover:text-white">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-gray-300 hover:text-white">
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-between mb-8 text-gray-400">
          <div className="flex items-center gap-6">
            <span>{sortedNFTs.length} NFTs found</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Floor: 45 CHZ</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">24h Volume: 12.5K CHZ</span>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedNFTs.map((nft) => (
            <Card
              key={nft.id}
              className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
            >
              <CardHeader className="p-0 relative">
                <Image
                  src={nft.image || "/placeholder.png"}
                  alt={nft.title}
                  width={250}
                  height={250}
                  className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge
                    className={`${
                      nft.rarity === "Legendary"
                        ? "bg-yellow-600/80 text-yellow-100 border-yellow-500/30"
                        : nft.rarity === "Epic"
                          ? "bg-purple-600/80 text-purple-100 border-purple-500/30"
                          : "bg-blue-600/80 text-blue-100 border-blue-500/30"
                    }`}
                  >
                    {nft.rarity}
                  </Badge>
                  {nft.isHot && <Badge className="bg-red-600/80 text-red-100 border-red-500/30">🔥 Hot</Badge>}
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 text-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs">
                    {nft.category}
                  </Badge>
                  {nft.isVerified && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400">Verified</span>
                    </div>
                  )}
                </div>

                <CardTitle className="text-white text-sm mb-2 line-clamp-1">{nft.title}</CardTitle>

                <div className="text-xs text-gray-400 mb-3">
                  <div>
                    by <span className="text-purple-300">{nft.creator}</span>
                  </div>
                  <div>
                    owned by <span className="text-gray-300">{nft.owner}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-red-400 font-bold">{nft.price}</div>
                    <div className="text-xs text-gray-500">{nft.priceUSD}</div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {nft.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {nft.views}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/marketplace/${nft.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-sm">
                      <ShoppingCart className="w-3 h-3 mr-2" />
                      Buy Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedNFTs.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No NFTs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Load More */}
        {sortedNFTs.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 px-8 bg-transparent"
            >
              Load More NFTs
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

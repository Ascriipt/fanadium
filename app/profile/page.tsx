"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Wallet, Trophy, Plus, Edit, Share, Heart, Eye } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collection")

  const userStats = {
    nftsOwned: 47,
    nftsCreated: 12,
  }

  const ownedNFTs = [
    {
      id: 1,
      title: "Legendary Goal Moment",
      image: "/placeholder.svg?height=250&width=250",
      price: "150 CHZ",
      rarity: "Legendary",
      likes: 234,
      views: 1200,
    },
    {
      id: 2,
      title: "Victory Celebration",
      image: "/placeholder.svg?height=250&width=250",
      price: "89 CHZ",
      rarity: "Epic",
      likes: 156,
      views: 890,
    },
    {
      id: 3,
      title: "Championship Trophy",
      image: "/placeholder.svg?height=250&width=250",
      price: "200 CHZ",
      rarity: "Legendary",
      likes: 345,
      views: 1500,
    },
    {
      id: 4,
      title: "Esports Victory",
      image: "/placeholder.svg?height=250&width=250",
      price: "75 CHZ",
      rarity: "Rare",
      likes: 98,
      views: 650,
    },
  ]

  const createdNFTs = [
    {
      id: 1,
      title: "Custom Sports Art",
      image: "/placeholder.svg?height=250&width=250",
      price: "120 CHZ",
      rarity: "Epic",
      likes: 187,
      views: 920,
      sales: 3,
    },
    {
      id: 2,
      title: "Team Spirit",
      image: "/placeholder.svg?height=250&width=250",
      price: "95 CHZ",
      rarity: "Rare",
      likes: 143,
      views: 780,
      sales: 7,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="w-24 h-24 border-2 border-purple-500/30">
              <AvatarImage src="/placeholder.png" />
              <AvatarFallback className="bg-purple-600/20 text-purple-300 text-2xl">JD</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">John Doe</h1>
                  <p className="text-gray-400 mb-2">@johndoe_sports</p>
                  <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">Verified Creator</Badge>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              <p className="text-gray-300 mb-6 max-w-2xl">
                Sports NFT enthusiast and creator. Passionate about capturing legendary moments in digital art.
                Specializing in football and esports collectibles.
              </p>

            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-black/40 backdrop-blur-sm border border-purple-500/20 mb-8">
            <TabsTrigger
              value="collection"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30"
            >
              <Trophy className="w-4 h-4 mr-2" />
              My Collection
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              My Creations
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30"
            >
              <User className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedNFTs.map((nft) => (
                <Card
                  key={nft.id}
                  className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={nft.image || "/placeholder.png"}
                      alt={nft.title}
                      width={250}
                      height={250}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`${
                          nft.rarity === "Legendary"
                            ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                            : nft.rarity === "Epic"
                              ? "bg-purple-600/20 text-purple-300 border-purple-500/30"
                              : "bg-blue-600/20 text-blue-300 border-blue-500/30"
                        }`}
                      >
                        {nft.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-sm mb-3">{nft.title}</CardTitle>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {nft.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {nft.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="created">
            <div className="mb-6">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Plus className="w-4 h-4 mr-2" />
                Create New NFT
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {createdNFTs.map((nft) => (
                <Card
                  key={nft.id}
                  className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={nft.image || "/placeholder.png"}
                      alt={nft.title}
                      width={250}
                      height={250}
                      className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`${
                          nft.rarity === "Epic"
                            ? "bg-purple-600/20 text-purple-300 border-purple-500/30"
                            : "bg-blue-600/20 text-blue-300 border-blue-500/30"
                        }`}
                      >
                        {nft.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-sm mb-3">{nft.title}</CardTitle>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {nft.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {nft.sales} sales
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Purchased "Legendary Goal Moment"</h3>
                      <p className="text-gray-400 text-sm">2 hours ago • 150 CHZ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Plus className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Created "Team Spirit" NFT</h3>
                      <p className="text-gray-400 text-sm">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Sold "Custom Sports Art"</h3>
                      <p className="text-gray-400 text-sm">3 days ago • 120 CHZ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

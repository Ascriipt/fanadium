'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getEvents, initializeStorage, type Event } from "@/lib/storage"
import { getSubmissions } from "@/lib/storage"

export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])

  // Initialize storage and load events
  useEffect(() => {
    initializeStorage();
    const events = getEvents(); // This now includes submissionCount
    // Show first 3 events as featured
    setFeaturedEvents(events.slice(0, 3));
  }, []);

  // Helper function to check if event is live
  const isEventLive = (event: Event) => {
    const eventDate = new Date(`${event.date}T${event.time.replace(' UTC', 'Z')}`);
    const now = new Date();
    return eventDate.getTime() <= now.getTime();
  };

  // Helper function to get workshop status
  const getWorkshopStatus = (event: Event) => {
    return isEventLive(event) ? false : true; // Workshop closed if event is live, open if not
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
              Powered by Chiliz Blockchain
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent mb-6">
              The Future of Sports NFTs
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover, collect, and trade exclusive sports and esports NFTs. Get tickets to premium events and join
              creative workshops.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
              >
                Explore Marketplace
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 px-8 py-3 bg-transparent"
              >
                View Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-400 text-lg">Get your tickets and join exclusive NFT workshops</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {event.sport}
                    </Badge>
                    {getWorkshopStatus(event) && (
                      <Badge className="bg-red-600/20 text-red-300 border-red-500/30">Workshop Live</Badge>
                    )}
                  </div>
                  <CardTitle className="text-white mb-2">{event.title}</CardTitle>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.submissionCount || 0} submissions
                    </div>
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      View Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
	  {/*
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured NFTs</h2>
            <p className="text-gray-400 text-lg">Discover rare and exclusive sports moments</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNFTs.map((nft) => (
              <Card
                key={nft.id}
                className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.title}
                    width={250}
                    height={250}
                    className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={`${
                        nft.rarity === "Legendary"
                          ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                          : "bg-purple-600/20 text-purple-300 border-purple-500/30"
                      }`}
                    >
                      {nft.rarity}
                    </Badge>
                    <span className="text-red-400 font-bold">{nft.price}</span>
                  </div>
                  <CardTitle className="text-white mb-2">{nft.title}</CardTitle>
                  <p className="text-gray-400 text-sm mb-4">by {nft.creator}</p>
                  <Link href={`/marketplace/${nft.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      View NFT
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      
    </div>
  )
}

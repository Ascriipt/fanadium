"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Ticket, Palette, Clock, Trophy, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: 1,
      title: "Champions League Final",
      date: "2024-06-01",
      time: "20:00 UTC",
      location: "Wembley Stadium, London",
      sport: "Football",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 1250,
      ticketPrice: "0.5 CHZ",
      workshopActive: true,
      workshopParticipants: 234,
      description: "The biggest football event of the year featuring the top European clubs.",
    },
    {
      id: 2,
      title: "World Esports Championship",
      date: "2024-05-15",
      time: "18:00 UTC",
      location: "Seoul Arena, South Korea",
      sport: "Esports",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 500,
      ticketPrice: "0.3 CHZ",
      workshopActive: true,
      workshopParticipants: 456,
      description: "Top esports teams compete for the ultimate championship title.",
    },
    {
      id: 3,
      title: "NBA Finals Game 7",
      date: "2024-06-20",
      time: "21:00 UTC",
      location: "Madison Square Garden, NYC",
      sport: "Basketball",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 800,
      ticketPrice: "0.8 CHZ",
      workshopActive: false,
      workshopParticipants: 0,
      description: "The decisive game that will crown the NBA champions.",
    },
    {
      id: 4,
      title: "Formula 1 Monaco Grand Prix",
      date: "2024-05-26",
      time: "14:00 UTC",
      location: "Circuit de Monaco",
      sport: "Racing",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 300,
      ticketPrice: "1.2 CHZ",
      workshopActive: true,
      workshopParticipants: 189,
      description: "The most prestigious race in the Formula 1 calendar.",
    },
    {
      id: 5,
      title: "Tennis Wimbledon Final",
      date: "2024-07-14",
      time: "15:00 UTC",
      location: "All England Club, London",
      sport: "Tennis",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 600,
      ticketPrice: "0.6 CHZ",
      workshopActive: true,
      workshopParticipants: 312,
      description: "The most prestigious tennis tournament final.",
    },
    {
      id: 6,
      title: "Olympic Games Opening",
      date: "2024-07-26",
      time: "20:00 UTC",
      location: "Paris, France",
      sport: "Olympics",
      image: "/placeholder.svg?height=200&width=300",
      ticketsAvailable: 2000,
      ticketPrice: "2.0 CHZ",
      workshopActive: true,
      workshopParticipants: 1024,
      description: "The grand opening ceremony of the Summer Olympics.",
    },
  ]

  const categories = [
    { id: "all", name: "All Events", count: events.length },
    { id: "football", name: "Football", count: events.filter((e) => e.sport === "Football").length },
    { id: "esports", name: "Esports", count: events.filter((e) => e.sport === "Esports").length },
    { id: "basketball", name: "Basketball", count: events.filter((e) => e.sport === "Basketball").length },
    { id: "racing", name: "Racing", count: events.filter((e) => e.sport === "Racing").length },
    { id: "tennis", name: "Tennis", count: events.filter((e) => e.sport === "Tennis").length },
    { id: "olympics", name: "Olympics", count: events.filter((e) => e.sport === "Olympics").length },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.sport.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent mb-4">
            Sports & Esports Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get exclusive tickets and join creative workshops to mint unique NFTs for your favorite events
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-purple-500/30 text-white placeholder:text-gray-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 backdrop-blur-sm border-purple-500/20">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-gray-300 hover:text-white ${
                      selectedCategory === category.id ? "bg-purple-600/20" : ""
                    }`}
                  >
                    {category.name} ({category.count})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-purple-600/80 text-white">
                      {event.sport}
                    </Badge>
                    {event.workshopActive && (
                      <Badge className="bg-red-600/80 text-white border-red-500/30">Workshop Live</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {event.title}
                </CardTitle>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Ticket className="w-4 h-4" />
                    {event.ticketsAvailable} available
                  </div>
                  <span className="text-red-400 font-bold">{event.ticketPrice}</span>
                </div>

                {event.workshopActive && (
                  <div className="bg-purple-600/10 border border-purple-500/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 font-medium text-sm">NFT Workshop Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Users className="w-3 h-3" />
                      {event.workshopParticipants} creators participating
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link href={`/events/${event.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      <Ticket className="w-4 h-4 mr-2" />
                      Get Ticket
                    </Button>
                  </Link>
                  {event.workshopActive && (
                    <Link href={`/events/${event.id}/workshop`}>
                      <Button
                        variant="outline"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                      >
                        <Palette className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Ticket, Palette, Clock, Trophy, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getEvents, getSubmissions, initializeStorage, type Event } from "@/lib/storage"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [events, setEvents] = useState<Event[]>([])

  // Initialize storage and load data
  useEffect(() => {
    initializeStorage();
    const eventsData = getEvents(); // This now includes submissionCount
    setEvents(eventsData);
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
                    {getWorkshopStatus(event) && (
                      <Badge className="bg-green-600/80 text-white border-green-500/30 text-xs">Workshop Open</Badge>
                    )}
                    {!getWorkshopStatus(event) && (
                      <Badge className="bg-red-600/80 text-white border-red-500/30 text-xs">Workshop Closed</Badge>
                    )}
                    <div className="flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      <Users className="w-3 h-3" />
                      {event.submissionCount || 0}
                    </div>
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

                <div className="flex gap-2">
                  <Link href={`/events/${event.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      <Ticket className="w-4 h-4 mr-2" />
                      See Event
                    </Button>
                  </Link>
                  {getWorkshopStatus(event) && (
                    <Link href={`/events/${event.id}/submit`}>
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

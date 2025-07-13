'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Users, Ticket, ThumbsUp, ThumbsDown } from "lucide-react";
import { 
  getEvents, 
  getSubmissions, 
  updateSubmissionVote, 
  initializeStorage,
  type Event,
  type Submission 
} from "@/lib/storage";

export default function EventPage() {
  const params = useParams();
  const id = params?.id as string;
  const eventId = parseInt(id);
  
  const [event, setEvent] = useState<Event | null>(null);
  const [submissionsState, setSubmissionsState] = useState<Submission[]>([]);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [votedSubmissions, setVotedSubmissions] = useState<Set<number>>(new Set());

  // Initialize storage and load data
  useEffect(() => {
    initializeStorage();
    const events = getEvents();
    const allSubmissions = getSubmissions();
    
    const currentEvent = events.find(e => e.id === eventId);
    if (currentEvent) {
      setEvent(currentEvent);
      setSubmissionsState(allSubmissions[eventId] || []);
    }
  }, [eventId]);

  // Calculate countdown to event start
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(`${event.date}T${event.time}`);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event]);

  // Handle voting
  const handleVote = (submissionIndex: number, voteType: 'up' | 'down') => {
    if (votedSubmissions.has(submissionIndex)) return;

    const voteChange = voteType === 'up' ? 1 : -1;
    
    // Update localStorage
    updateSubmissionVote(eventId, submissionIndex, voteChange);
    
    // Update local state
    setSubmissionsState(prev => {
      const newSubmissions = [...prev];
      newSubmissions[submissionIndex].votes += voteChange;
      return newSubmissions;
    });

    setVotedSubmissions(prev => new Set([...prev, submissionIndex]));
  };

  // Handle ticket purchase
  const handleBuyTickets = () => {
    // Replace with actual ticket seller URL
    window.open(`https://tickets.example.com/event/${eventId}`, '_blank');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white">Event not found</h1>
        </div>
      </div>
    );
  }

  const isVotingOpen = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${event.image})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent mb-4">
              {event.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Event Details */}
        <div className="mb-12">
          <Card className="bg-black/20 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Countdown Timer */}
              <div className="border-b border-purple-500/20 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">
                    {isVotingOpen ? "Voting Closes In" : "Event Has Started"}
                  </span>
                </div>
                {isVotingOpen ? (
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{timeLeft.days}</div>
                      <div className="text-xs text-gray-400">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{timeLeft.hours}</div>
                      <div className="text-xs text-gray-400">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{timeLeft.minutes}</div>
                      <div className="text-xs text-gray-400">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{timeLeft.seconds}</div>
                      <div className="text-xs text-gray-400">Seconds</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <div className="text-lg font-bold text-green-400 mb-1">Event Live!</div>
                    <p className="text-gray-400 text-sm">Voting has closed and the event has begun.</p>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300"></span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {event.sport}
                    </Badge>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-300"></span>
                    <Badge variant={event.workshopActive ? "secondary" : "default"} className={event.workshopActive ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-green-500/20 text-green-300 border-green-500/30"}>
                      {event.workshopActive ? "Workshop Open" : "Workshop Closed"}
                    </Badge>
                    {event.workshopActive && (
                      <>
                        <span className="text-gray-300">•</span>
                        <Users className="w-4 h-4 text-purple-300" />
                        <span className="text-white">{event.workshopParticipants}</span>
                      </>
                    )}
                    <span className="text-gray-300">•</span>
                    <span className="text-white font-semibold">{submissionsState.length}</span>
                    <span className="text-gray-300 text-sm">submissions</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">{event.description}</p>
                <Button 
                  onClick={handleBuyTickets}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Buy Tickets
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Submissions</h2>
          {submissionsState.length === 0 ? (
            <Card className="bg-black/20 border-purple-500/20">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">No submissions yet for this event.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissionsState.map((submission: Submission, index: number) => (
                <Card key={index} className="bg-black/20 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                    <img 
                      src={submission.image} 
                      alt={submission.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{submission.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{submission.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-300 text-sm">by {submission.creator}</span>
                      <span className="text-gray-400 text-sm">{submission.date}</span>
                    </div>
                    
                    {isVotingOpen && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(index, 'up')}
                            disabled={votedSubmissions.has(index)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(index, 'down')}
                            disabled={votedSubmissions.has(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{submission.votes}</span>
                          <span className="text-gray-400 text-sm">votes</span>
                        </div>
                      </div>
                    )}
                    
                    {!isVotingOpen && (
                      <div className="text-center">
                        <span className="text-white font-semibold">{submission.votes}</span>
                        <span className="text-gray-400 text-sm ml-1">final votes</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
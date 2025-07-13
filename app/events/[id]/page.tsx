'use client'
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, Ticket, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import Link from "next/link";
import { 
  getEvents, 
  getEventsWithSubmissions,
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
  const [votedSubmissions, setVotedSubmissions] = useState<Record<number, 'up' | 'down'>>({});
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Initialize storage and load data
  useEffect(() => {
    initializeStorage();
    const eventsWithSubmissions = getEventsWithSubmissions();
    
    const currentEvent = eventsWithSubmissions.find(e => e.id === eventId);
    if (currentEvent) {
      setEvent(currentEvent);
      setSubmissionsState(currentEvent.submissions || []);
    }
    
    // Load voted submissions from localStorage
    const votedData = localStorage.getItem('fanadium_voted_submissions');
    if (votedData) {
      try {
        const parsed = JSON.parse(votedData);
        if (parsed[eventId]) {
          setVotedSubmissions(parsed[eventId]);
        }
      } catch (error) {
        console.error('Error loading voted submissions:', error);
      }
    }
  }, [eventId]);



  // Calculate countdown to event start
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      // Fix the date parsing - handle UTC time properly
      let eventDate;
      if (event.time.includes('UTC')) {
        // Parse UTC time correctly
        const timeOnly = event.time.replace(' UTC', '');
        eventDate = new Date(`${event.date}T${timeOnly}Z`);
      } else {
        eventDate = new Date(`${event.date}T${event.time}`);
      }
      
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



  // Single function voting - only update localStorage, let state sync
  const handleVote = (submissionIndex: number, voteType: 'up' | 'down') => {
    if (submissionIndex in votedSubmissions) return;
    
    const voteChange = voteType === 'up' ? 1 : -1;
    
    // Only update localStorage, state will sync from there
    const allSubmissions = getEventsWithSubmissions();
    if (allSubmissions[eventId]?.submissions?.[submissionIndex]) {
      allSubmissions[eventId].submissions[submissionIndex].votes += voteChange;
      localStorage.setItem('fanadium_submissions', JSON.stringify(allSubmissions.map(e => e.submissions)));
      
      // Update state from localStorage
      setSubmissionsState(allSubmissions[eventId].submissions);
    }
    
    // Mark as voted and save to localStorage
    setVotedSubmissions(prev => {
      const newVoted = { ...prev, [submissionIndex]: voteType };
      
      // Save voted submissions to localStorage
      const votedData = localStorage.getItem('fanadium_voted_submissions');
      const allVoted = votedData ? JSON.parse(votedData) : {};
      allVoted[eventId] = newVoted;
      localStorage.setItem('fanadium_voted_submissions', JSON.stringify(allVoted));
      
      return newVoted;
    });
  };

  // Handle ticket purchase
  const handleBuyTickets = () => {
    // Replace with actual ticket seller URL
    window.open(`https://tickets.example.com/event/${eventId}`, '_blank');
  };

  // Handle opening image modal
  const handleImageClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsImageModalOpen(true);
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

  const isWorkshopOpen = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

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
                    {isWorkshopOpen ? "Event Starts In" : "Event Has Started"}
                  </span>
                </div>
                {isWorkshopOpen ? (
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
                    <Badge variant={isWorkshopOpen ? "secondary" : "default"} className={isWorkshopOpen ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}>
                      {isWorkshopOpen ? "Workshop Open" : "Workshop Closed"}
                    </Badge>
                    {isWorkshopOpen && (
                      <>
                        <span className="text-gray-300">•</span>
                        <Users className="w-4 h-4 text-purple-300" />
                        <span className="text-white">{event.workshopParticipants}</span>
                      </>
                    )}
                    <span className="text-gray-300">•</span>
                    <FileText className="w-4 h-4 text-purple-300" />
                    <span className="text-white font-semibold">{event.submissionCount}</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">{event.description}</p>
                <div className="flex gap-4">
                  <Button 
                    onClick={handleBuyTickets}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Buy Tickets
                  </Button>
                  {isWorkshopOpen && (
                    <Link href={`/events/${eventId}/submit`}>
                      <Button 
                        variant="outline"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-600/10 bg-transparent"
                      >
                        Submit Design
                      </Button>
                    </Link>
                  )}
                </div>
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
                <p className="text-gray-400 mb-4">No submissions yet for this event.</p>
                {isWorkshopOpen && (
                  <Link href={`/events/${eventId}/submit`}>
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                      Be the First to Submit!
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissionsState.map((submission: Submission, index: number) => (
                <Card key={index} className="bg-black/20 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleImageClick(submission)}>
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
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleVote(index, 'up')}
                          disabled={index in votedSubmissions}
                          className={
                            index in votedSubmissions 
                              ? votedSubmissions[index] === 'up'
                                ? 'text-green-400 bg-green-400/20 hover:bg-green-400/30'
                                : 'text-gray-500'
                              : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                          }
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleVote(index, 'down')}
                          disabled={index in votedSubmissions}
                          className={
                            index in votedSubmissions 
                              ? votedSubmissions[index] === 'down'
                                ? 'text-red-400 bg-red-400/20 hover:bg-red-400/30'
                                : 'text-gray-500'
                              : 'text-red-400 hover:text-red-300 hover:bg-red-400/10'
                          }
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{submission.votes}</span>
                        <span className="text-gray-400 text-sm">votes</span>
                      </div>
                    </div>
                    

                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-purple-950/40 backdrop-blur-3xl border-purple-800/40 shadow-2xl">
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedSubmission.title}</h3>
                <p className="text-gray-300 mb-4">{selectedSubmission.description}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span>by {selectedSubmission.creator}</span>
                  <span>•</span>
                  <span>{selectedSubmission.date}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src={selectedSubmission.image} 
                  alt={selectedSubmission.title}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
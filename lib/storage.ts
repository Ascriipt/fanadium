export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  sport: string;
  image: string;
  ticketsAvailable: number;
  ticketPrice: string;
  workshopActive: boolean;
  workshopParticipants: number;
  description: string;
  submissionCount: number;
  submissions?: Submission[];
}

export interface Submission {
  creator: string;
  date: string;
  title: string;
  description: string;
  image: string;
  votes: number;
}

// Default data
const defaultEvents: Event[] = [
  {
    id: 0,
    title: "Champions League Final",
    date: "2026-06-01",
    time: "20:00 UTC",
    location: "Parc des Princes, Paris",
    sport: "Football",
    image: "/football.png?height=200&width=300",
    ticketsAvailable: 1250,
    ticketPrice: "0.5 CHZ",
    workshopActive: true,
    workshopParticipants: 234,
    description: "The biggest football event of the year featuring the top European clubs.",
    submissionCount: 0,
  },
  {
    id: 1,
    title: "World Esports Championship",
    date: "2025-05-15",
    time: "18:00 UTC",
    location: "Seoul Arena, South Korea",
    sport: "Esports",
    image: "/placeholder.png",
    ticketsAvailable: 500,
    ticketPrice: "0.3 CHZ",
    workshopActive: true,
    workshopParticipants: 456,
    description: "Top esports teams compete for the ultimate championship title.",
    submissionCount: 0,
  },
  {
    id: 2,
    title: "NBA Finals Game 7",
    date: "2025-06-20",
    time: "21:00 UTC",
    location: "Madison Square Garden, NYC",
    sport: "Basketball",
    image: "/placeholder.png",
    ticketsAvailable: 800,
    ticketPrice: "0.8 CHZ",
    workshopActive: false,
    workshopParticipants: 0,
    description: "The decisive game that will crown the NBA champions.",
    submissionCount: 0,
  },
  {
    id: 3,
    title: "Formula 1 Monaco Grand Prix",
    date: "2025-05-26",
    time: "14:00 UTC",
    location: "Circuit de Monaco",
    sport: "Racing",
    image: "/f1grandprix.png?height=200&width=300",
    ticketsAvailable: 300,
    ticketPrice: "1.2 CHZ",
    workshopActive: true,
    workshopParticipants: 189,
    description: "The most prestigious race in the Formula 1 calendar.",
    submissionCount: 0,
  },
  {
    id: 4,
    title: "Tennis Wimbledon Final",
    date: "2025-07-14",
    time: "15:00 UTC",
    location: "All England Club, London",
    sport: "Tennis",
    image: "/tennis.png?height=200&width=300",
    ticketsAvailable: 600,
    ticketPrice: "0.6 CHZ",
    workshopActive: true,
    workshopParticipants: 312,
    description: "The most prestigious tennis tournament final.",
    submissionCount: 0,
  },
  {
    id: 5,
    title: "Olympic Games Opening",
    date: "2025-07-26",
    time: "20:00 UTC",
    location: "Paris, France",
    sport: "Olympics",
    image: "/placeholder.png",
    ticketsAvailable: 2000,
    ticketPrice: "2.0 CHZ",
    workshopActive: true,
    workshopParticipants: 1024,
    description: "The grand opening ceremony of the Summer Olympics.",
    submissionCount: 0,
  },
];

const defaultSubmissions: Submission[][] = [
  [
    {
      creator: "SportsMoments",
      date: "2024-04-10",
      title: "Decisive Dunk",
      description: "A stunning slam dunk that turned the tide in Game 7 of the NBA Finals.",
      image: "/collectibles/decisive-dunk.png",
      votes: 128
    },
    {
      creator: "HoopsArtist",
      date: "2024-04-12",
      title: "Final Buzzer Beater",
      description: "The unforgettable last-second shot that clinched the championship.",
      image: "/collectibles/final-buzzer-beater.png",
      votes: 97
    },
    {
      creator: "BasketballFanatic",
      date: "2024-04-13",
      title: "Champions' Celebration",
      description: "The team's euphoric celebration after winning the NBA Finals.",
      image: "/collectibles/champions-celebration.png",
      votes: 76
    }
  ],
  [
    {
      creator: "EsportsPro",
      date: "2024-04-08",
      title: "Epic Comeback",
      description: "The most incredible comeback in esports history during the championship finals.",
      image: "/collectibles/epic-comeback.png",
      votes: 234
    },
    {
      creator: "GamingLegend",
      date: "2024-04-09",
      title: "Perfect Play",
      description: "A flawless execution of the most complex strategy ever seen in competitive gaming.",
      image: "/collectibles/perfect-play.png",
      votes: 189
    },
    {
      creator: "DigitalArtist",
      date: "2024-04-11",
      title: "Victory Moment",
      description: "The emotional moment when the underdog team claimed the world championship.",
      image: "/collectibles/victory-moment.png",
      votes: 156
    }
  ],
  [
    {
      creator: "SportsMoments",
      date: "2024-04-10",
      title: "Decisive Dunk",
      description: "A stunning slam dunk that turned the tide in Game 7 of the NBA Finals.",
      image: "/collectibles/decisive-dunk.png",
      votes: 128
    },
    {
      creator: "HoopsArtist",
      date: "2024-04-12",
      title: "Final Buzzer Beater",
      description: "The unforgettable last-second shot that clinched the championship.",
      image: "/collectibles/final-buzzer-beater.png",
      votes: 97
    },
    {
      creator: "BasketballFanatic",
      date: "2024-04-13",
      title: "Champions' Celebration",
      description: "The team's euphoric celebration after winning the NBA Finals.",
      image: "/collectibles/champions-celebration.png",
      votes: 76
    }
  ],
  [
    {
      creator: "SpeedDemon",
      date: "2024-04-07",
      title: "Perfect Lap",
      description: "The fastest lap ever recorded on the Monaco circuit during qualifying.",
      image: "/collectibles/perfect-lap.png",
      votes: 312
    },
    {
      creator: "RacingFan",
      date: "2024-04-08",
      title: "Dramatic Overtake",
      description: "An incredible overtaking maneuver on the final corner of the race.",
      image: "/collectibles/dramatic-overtake.png",
      votes: 245
    },
    {
      creator: "F1Enthusiast",
      date: "2024-04-09",
      title: "Podium Finish",
      description: "The emotional celebration of a first-time podium finisher at Monaco.",
      image: "/collectibles/podium-finish.png",
      votes: 178
    }
  ],
  [
    {
      creator: "TennisPro",
      date: "2024-04-06",
      title: "Match Point",
      description: "The incredible match point that decided the Wimbledon final.",
      image: "/collectibles/match-point.png",
      votes: 267
    },
    {
      creator: "CourtArtist",
      date: "2024-04-07",
      title: "Perfect Serve",
      description: "The fastest serve ever recorded in Wimbledon history.",
      image: "/collectibles/perfect-serve.png",
      votes: 198
    },
    {
      creator: "TennisFan",
      date: "2024-04-08",
      title: "Champion's Victory",
      description: "The moment when the champion lifted the prestigious trophy.",
      image: "/collectibles/champions-victory.png",
      votes: 145
    }
  ],
  [
    {
      creator: "OlympicSpirit",
      date: "2024-04-05",
      title: "Opening Ceremony",
      description: "The breathtaking opening ceremony that kicked off the Olympic Games.",
      image: "/collectibles/opening-ceremony.png",
      votes: 456
    },
    {
      creator: "GlobalUnity",
      date: "2024-04-06",
      title: "Parade of Nations",
      description: "The beautiful parade of athletes from all participating countries.",
      image: "/collectibles/parade-nations.png",
      votes: 389
    },
    {
      creator: "OlympicDream",
      date: "2024-04-07",
      title: "Torch Lighting",
      description: "The magical moment when the Olympic flame was lit.",
      image: "/collectibles/torch-lighting.png",
      votes: 298
    }
  ]
];

// Storage keys
const EVENTS_KEY = 'fanadium_events';
const SUBMISSIONS_KEY = 'fanadium_submissions';
const VOTED_SUBMISSIONS_KEY = 'fanadium_voted_submissions';

// Helper functions
const isClient = typeof window !== 'undefined';

// Initialize data in localStorage if it doesn't exist
export const initializeStorage = () => {
  if (!isClient) return;
  
  if (!localStorage.getItem(EVENTS_KEY)) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
  }
  
  if (!localStorage.getItem(SUBMISSIONS_KEY)) {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(defaultSubmissions));
  }
};

// Get events from localStorage (with submission counts only)
export const getEvents = (): Event[] => {
  if (!isClient) return defaultEvents;
  
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    const events = stored ? JSON.parse(stored) : defaultEvents;
    
    // Get submission counts
    const allSubmissions = getSubmissions();
    events.forEach((event: Event) => {
      event.submissionCount = allSubmissions[event.id]?.length || 0;
    });
    
    return events;
  } catch (error) {
    console.error('Error reading events from localStorage:', error);
    return defaultEvents;
  }
};

// Get events with full submission data
export const getEventsWithSubmissions = (): Event[] => {
  if (!isClient) return defaultEvents;
  
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    const events = stored ? JSON.parse(stored) : defaultEvents;
    
    // Get full submission data
    const allSubmissions = getSubmissions();
    events.forEach((event: Event) => {
      event.submissionCount = allSubmissions[event.id]?.length || 0;
      event.submissions = allSubmissions[event.id] || [];
    });
    
    return events;
  } catch (error) {
    console.error('Error reading events with submissions from localStorage:', error);
    return defaultEvents;
  }
};

// Get submissions from localStorage
export const getSubmissions = (): Submission[][] => {
  if (!isClient) return defaultSubmissions;
  
  try {
    const stored = localStorage.getItem(SUBMISSIONS_KEY);
    return stored ? JSON.parse(stored) : defaultSubmissions;
  } catch (error) {
    console.error('Error reading submissions from localStorage:', error);
    return defaultSubmissions;
  }
};

// Save events to localStorage
export const saveEvents = (events: Event[]) => {
  if (!isClient) return;
  
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
  }
};

// Save submissions to localStorage
export const saveSubmissions = (submissions: Submission[][]) => {
  if (!isClient) return;
  
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error saving submissions to localStorage:', error);
  }
};

// Update a specific event
export const updateEvent = (eventId: number, updates: Partial<Event>) => {
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex !== -1) {
    events[eventIndex] = { ...events[eventIndex], ...updates };
    saveEvents(events);
  }
};

// Update submissions for a specific event
export const updateEventSubmissions = (eventId: number, submissions: Submission[]) => {
  const allSubmissions = getSubmissions();
  allSubmissions[eventId] = submissions;
  saveSubmissions(allSubmissions);
  
  // Update event's submission count
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex !== -1) {
    events[eventIndex].submissionCount = submissions.length;
    saveEvents(events);
  }
};

// Add a new submission to an event
export const addSubmission = (eventId: number, submission: Omit<Submission, 'votes'>) => {
  const allSubmissions = getSubmissions();
  const newSubmission: Submission = {
    ...submission,
    votes: 0
  };
  
  if (!allSubmissions[eventId]) {
    allSubmissions[eventId] = [];
  }
  
  allSubmissions[eventId].push(newSubmission);
  saveSubmissions(allSubmissions);
  
  // Update event's submission count
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex !== -1) {
    events[eventIndex].submissionCount = allSubmissions[eventId].length;
    saveEvents(events);
  }
};

// Update vote count for a submission
export const updateSubmissionVote = (eventId: number, submissionIndex: number, voteChange: number) => {
  const allSubmissions = getSubmissions();
  
  if (allSubmissions[eventId] && allSubmissions[eventId][submissionIndex]) {
    allSubmissions[eventId][submissionIndex].votes += voteChange;
    saveSubmissions(allSubmissions);
  }
};

// Reset to default data
export const resetToDefaults = () => {
  if (!isClient) return;
  
  localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(defaultSubmissions));
}; 

// Get voted submissions from localStorage
export const getVotedSubmissions = (): Record<number, Set<number>> => {
  if (!isClient) return {};
  
  try {
    const stored = localStorage.getItem(VOTED_SUBMISSIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert arrays back to Sets
      const result: Record<number, Set<number>> = {};
      Object.keys(parsed).forEach(eventId => {
        result[parseInt(eventId)] = new Set(parsed[eventId]);
      });
      return result;
    }
    return {};
  } catch (error) {
    console.error('Error reading voted submissions from localStorage:', error);
    return {};
  }
};

// Save voted submissions to localStorage
export const saveVotedSubmissions = (votedSubmissions: Record<number, Set<number>>) => {
  if (!isClient) return;
  
  try {
    // Convert Sets to arrays for JSON serialization
    const serializable: Record<number, number[]> = {};
    Object.keys(votedSubmissions).forEach(eventId => {
      serializable[parseInt(eventId)] = Array.from(votedSubmissions[parseInt(eventId)]);
    });
    localStorage.setItem(VOTED_SUBMISSIONS_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error('Error saving voted submissions to localStorage:', error);
  }
};

// Add a vote for a specific submission
export const addVoteRecord = (eventId: number, submissionIndex: number) => {
  const votedSubmissions = getVotedSubmissions();
  if (!votedSubmissions[eventId]) {
    votedSubmissions[eventId] = new Set();
  }
  votedSubmissions[eventId].add(submissionIndex);
  saveVotedSubmissions(votedSubmissions);
}; 
import type { Challenge } from '@/types'

export const sampleChallenges: Omit<Challenge, 'id' | 'startsAt' | 'endsAt'>[] = [
  {
    title: 'Gran Turismo Tribute: $100K Dream Garage',
    description: 'Build your ultimate Gran Turismo garage with a $100,000 budget. Channel that 90s PlayStation energy!',
    theme: 'gran_turismo',
    type: 'budget',
    budgetLimit: 100000,
    difficulty: 'medium',
    points: 150,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    isActive: true,
  },
  {
    title: 'Fast & Furious: Toretto Family Garage',
    description: 'Assemble a garage worthy of Dom and the family. Muscle, imports, and everything in between.',
    theme: 'fast_furious',
    type: 'movie',
    movieReference: 'The Fast and the Furious Franchise',
    difficulty: 'medium',
    points: 200,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    isActive: true,
  },
  {
    title: 'Top Gear Challenge: Best Car for £5,000',
    description: 'Channel your inner Clarkson, Hammond, and May. Find the best car under £5,000 and defend your choice!',
    theme: 'top_gear',
    type: 'budget',
    budgetLimit: 6500,
    difficulty: 'hard',
    points: 175,
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    isActive: true,
  },
  {
    title: 'Doug Score: Oddballs Only',
    description: 'Find the weirdest, quirkiest cars that would make Doug DeMuro proud. The stranger, the better!',
    theme: 'doug_demuro',
    type: 'oddball',
    difficulty: 'expert',
    points: 250,
    imageUrl: 'https://images.unsplash.com/photo-1609134172728-48f40b2e8c02?w=800',
    isActive: true,
  },
  {
    title: 'Radwood: Peak 80s/90s Aesthetic',
    description: 'Curate a garage that screams rad. Digital dashes, pop-up headlights, and maximum period-correct vibes.',
    theme: 'radwood',
    type: 'era',
    eraStart: 1980,
    eraEnd: 1999,
    difficulty: 'medium',
    points: 175,
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
    isActive: true,
  },
  {
    title: 'BaT Auction Hunt: Undervalued Gems',
    description: 'Scout the virtual auction block for cars that are undervalued TODAY but destined for appreciation.',
    theme: 'bat_auction',
    type: 'collector',
    difficulty: 'expert',
    points: 300,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
    isActive: true,
  },
  {
    title: 'Tokyo Drift: JDM Dream Team',
    description: 'Build the ultimate JDM garage. Skylines, Supras, RX-7s, and everything that drifts!',
    theme: 'fast_furious',
    type: 'era',
    eraStart: 1985,
    eraEnd: 2002,
    movieReference: 'The Fast and the Furious: Tokyo Drift',
    difficulty: 'medium',
    points: 200,
    imageUrl: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800',
    isActive: true,
  },
  {
    title: 'Screen Legends: Cars That Stole The Show',
    description: 'Pick cars that became characters themselves. From Eleanor to the Batmobile, cinema\'s greatest rides.',
    theme: 'fast_furious',
    type: 'movie',
    difficulty: 'hard',
    points: 225,
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
    isActive: true,
  },
  {
    title: 'Hoovie\'s Hoopties: $10K Chaos',
    description: 'Embrace the chaos! Find the most ambitious (questionable?) car purchases under $10,000.',
    theme: 'doug_demuro',
    type: 'wildcard',
    budgetLimit: 10000,
    difficulty: 'hard',
    points: 200,
    imageUrl: 'https://images.unsplash.com/photo-1609134172728-48f40b2e8c02?w=800',
    isActive: true,
  },
  {
    title: 'Cool Wall: Uncool to Sub-Zero',
    description: 'Rate cars on the legendary Cool Wall scale. Defend your placements or face the tribunal!',
    theme: 'top_gear',
    type: 'wildcard',
    difficulty: 'medium',
    points: 150,
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800',
    isActive: true,
  },
]

export const challengeThemeDescriptions: Record<string, string> = {
  gran_turismo: 'Inspired by the legendary PlayStation racing sim that defined car culture for a generation.',
  fast_furious: 'Channel the high-octane energy of the Fast & Furious franchise. Family required.',
  top_gear: 'British wit, ambitious challenges, and questionable car choices. How hard can it be?',
  doug_demuro: 'Embrace the quirks, features, and Doug Score methodology. Bumper-to-bumper analysis.',
  radwood: 'Celebrating the rad cars of the 80s and 90s. Pop-up headlights and digital dashes welcome.',
  bat_auction: 'Bring a Trailer-style collector focus. Provenance, condition, and market trends matter.',
}

export const getDailyChallenge = (challenges: Challenge[]): Challenge | null => {
  const today = new Date()
  return challenges.find((c) => {
    const start = new Date(c.startsAt)
    const end = new Date(c.endsAt)
    return c.isActive && today >= start && today <= end
  }) || null
}

export const getUpcomingChallenges = (challenges: Challenge[], limit = 5): Challenge[] => {
  const now = new Date()
  return challenges
    .filter((c) => new Date(c.startsAt) > now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit)
}

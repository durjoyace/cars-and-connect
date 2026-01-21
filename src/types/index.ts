export type DisplayMode = 'pop_culture' | 'collector' | 'balanced'

export type ChallengeTheme =
  | 'gran_turismo'
  | 'fast_furious'
  | 'top_gear'
  | 'doug_demuro'
  | 'radwood'
  | 'bat_auction'

export type ChallengeType =
  | 'budget'
  | 'era'
  | 'movie'
  | 'wildcard'
  | 'oddball'
  | 'collector'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary'

export type ReactionType =
  | 'fire'
  | 'respect'
  | 'legend'
  | 'sleeper'
  | 'barn_find'
  | 'money_pit'

export type UnlockType =
  | 'garage_theme'
  | 'sticker_pack'
  | 'badge'
  | 'feature'
  | 'challenge_type'

export type GarageTheme =
  | 'tokyo_drift'
  | 'seinfeld'
  | 'top_gear_cool'
  | 'radwood'
  | 'movie_legends'
  | 'jdm_legends'
  | 'muscle_mayhem'
  | 'euro_elegance'

export interface Car {
  id: string
  make: string
  model: string
  year: number
  trim?: string
  vin?: string
  engineType?: string
  horsepower?: number
  torque?: number
  transmission?: string
  drivetrain?: string
  weight?: number
  zeroToSixty?: number
  topSpeed?: number
  msrp?: number
  currentValue?: number
  imageUrl?: string
  movieAppearances?: string
  famousOwners?: string
  productionCount?: number
  rarity?: Rarity
  auctionHistory?: AuctionRecord[]
  provenance?: OwnershipRecord[]
}

export interface AuctionRecord {
  date: string
  house: string
  price: number
  condition: string
  url?: string
}

export interface OwnershipRecord {
  owner: string
  period: string
  location?: string
  notes?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  theme: ChallengeTheme
  type: ChallengeType
  budgetLimit?: number
  eraStart?: number
  eraEnd?: number
  movieReference?: string
  difficulty: Difficulty
  points: number
  imageUrl?: string
  isActive: boolean
  startsAt: Date
  endsAt: Date
}

export interface Garage {
  id: string
  name: string
  description?: string
  theme?: GarageTheme
  isPublic: boolean
  userId: string
  entries: GarageEntry[]
}

export interface GarageEntry {
  id: string
  garageId: string
  carId: string
  car: Car
  notes?: string
  position: number
}

export interface GarageSubmission {
  id: string
  userId: string
  challengeId: string
  title: string
  description?: string
  totalValue?: number
  cars: Car[]
  reactions: Reaction[]
  createdAt: Date
}

export interface Reaction {
  id: string
  userId: string
  submissionId: string
  type: ReactionType
}

export interface Unlock {
  id: string
  userId: string
  type: UnlockType
  itemId: string
  unlockedAt: Date
}

export interface UserStats {
  totalChallenges: number
  currentStreak: number
  longestStreak: number
  totalPoints: number
  invitesSent: number
  invitesAccepted: number
  garagesCreated: number
  totalReactions: number
  unlocksEarned: number
}

export interface UnlockableItem {
  id: string
  type: UnlockType
  name: string
  description?: string
  imageUrl?: string
  requirement: string
  requiredCount: number
  category?: 'pop_culture' | 'collector' | 'both'
  isUnlocked?: boolean
  progress?: number
}

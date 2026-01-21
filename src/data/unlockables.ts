import type { UnlockableItem } from '@/types'

export const unlockableItems: Omit<UnlockableItem, 'id' | 'isUnlocked' | 'progress'>[] = [
  // Garage Themes
  {
    type: 'garage_theme',
    name: 'Tokyo Drift Neon',
    description: 'Neon-soaked garage theme inspired by the streets of Tokyo',
    imageUrl: '/themes/tokyo-drift.png',
    requirement: 'invites_3',
    requiredCount: 3,
    category: 'pop_culture',
  },
  {
    type: 'garage_theme',
    name: 'Seinfeld\'s Collection',
    description: 'Clean, classic aesthetic inspired by Jerry\'s Porsche collection',
    imageUrl: '/themes/seinfeld.png',
    requirement: 'challenge_complete_5',
    requiredCount: 5,
    category: 'collector',
  },
  {
    type: 'garage_theme',
    name: 'Top Gear Cool Wall',
    description: 'Rate your cars from uncool to sub-zero',
    imageUrl: '/themes/top-gear.png',
    requirement: 'streak_7',
    requiredCount: 7,
    category: 'pop_culture',
  },
  {
    type: 'garage_theme',
    name: 'Radwood Retro',
    description: '80s/90s aesthetic with period-correct details',
    imageUrl: '/themes/radwood.png',
    requirement: 'challenge_complete_10',
    requiredCount: 10,
    category: 'both',
  },
  {
    type: 'garage_theme',
    name: 'BaT Auction House',
    description: 'Professional auction gallery style',
    imageUrl: '/themes/bat.png',
    requirement: 'collector_mode_used',
    requiredCount: 20,
    category: 'collector',
  },

  // Sticker Packs
  {
    type: 'sticker_pack',
    name: '90s JDM Pack',
    description: 'Vintage Japanese tuner stickers and badges',
    imageUrl: '/stickers/jdm-pack.png',
    requirement: 'invites_1',
    requiredCount: 1,
    category: 'pop_culture',
  },
  {
    type: 'sticker_pack',
    name: 'Fast & Furious Quotes',
    description: '"I live my life a quarter mile at a time" and more',
    imageUrl: '/stickers/ff-quotes.png',
    requirement: 'challenge_complete_3',
    requiredCount: 3,
    category: 'pop_culture',
  },
  {
    type: 'sticker_pack',
    name: 'Auction House Stamps',
    description: 'BaT, RM Sotheby\'s, Barrett-Jackson certified stamps',
    imageUrl: '/stickers/auction-stamps.png',
    requirement: 'provenance_views',
    requiredCount: 10,
    category: 'collector',
  },
  {
    type: 'sticker_pack',
    name: 'Racing Heritage',
    description: 'Le Mans, Daytona, and motorsport legends',
    imageUrl: '/stickers/racing.png',
    requirement: 'streak_14',
    requiredCount: 14,
    category: 'both',
  },

  // Badges
  {
    type: 'badge',
    name: 'First Challenge',
    description: 'Completed your first challenge',
    imageUrl: '/badges/first-challenge.png',
    requirement: 'challenge_complete_1',
    requiredCount: 1,
    category: 'both',
  },
  {
    type: 'badge',
    name: 'Social Butterfly',
    description: 'Invited 5 friends to join',
    imageUrl: '/badges/social.png',
    requirement: 'invites_5',
    requiredCount: 5,
    category: 'both',
  },
  {
    type: 'badge',
    name: 'Streak Master',
    description: 'Maintained a 30-day streak',
    imageUrl: '/badges/streak.png',
    requirement: 'streak_30',
    requiredCount: 30,
    category: 'both',
  },
  {
    type: 'badge',
    name: 'Historian',
    description: 'Viewed provenance details on 50 cars',
    imageUrl: '/badges/historian.png',
    requirement: 'provenance_views',
    requiredCount: 50,
    category: 'collector',
  },
  {
    type: 'badge',
    name: 'JDM Legend',
    description: 'Built 10 garages with Japanese cars',
    imageUrl: '/badges/jdm-legend.png',
    requirement: 'jdm_garages',
    requiredCount: 10,
    category: 'pop_culture',
  },

  // Features
  {
    type: 'feature',
    name: 'Provenance Mode',
    description: 'Unlock detailed ownership histories and auction records',
    imageUrl: '/features/provenance.png',
    requirement: 'invites_2',
    requiredCount: 2,
    category: 'collector',
  },
  {
    type: 'feature',
    name: 'VIN Lookup',
    description: 'Access VIN decoding and history reports',
    imageUrl: '/features/vin.png',
    requirement: 'challenge_complete_7',
    requiredCount: 7,
    category: 'collector',
  },
  {
    type: 'feature',
    name: 'Custom Reactions',
    description: 'Unlock the full reaction pack for submissions',
    imageUrl: '/features/reactions.png',
    requirement: 'reactions_given',
    requiredCount: 25,
    category: 'both',
  },
  {
    type: 'feature',
    name: 'Deep Dive Stats',
    description: 'Access advanced analytics and comparison tools',
    imageUrl: '/features/stats.png',
    requirement: 'streak_21',
    requiredCount: 21,
    category: 'collector',
  },

  // Challenge Types
  {
    type: 'challenge_type',
    name: 'Screen Legends Only',
    description: 'Challenges featuring cars from movies and TV',
    imageUrl: '/challenges/screen-legends.png',
    requirement: 'group_milestone',
    requiredCount: 1,
    category: 'pop_culture',
  },
  {
    type: 'challenge_type',
    name: 'Auction Hunter',
    description: 'Challenges based on real auction results',
    imageUrl: '/challenges/auction-hunter.png',
    requirement: 'collector_challenges',
    requiredCount: 5,
    category: 'collector',
  },
  {
    type: 'challenge_type',
    name: 'Expert Mode',
    description: 'Access to expert-difficulty challenges',
    imageUrl: '/challenges/expert.png',
    requirement: 'challenge_complete_15',
    requiredCount: 15,
    category: 'both',
  },
]

export const getUnlockProgress = (requirement: string, userStats: Record<string, number>): number => {
  const statKey = requirement.split('_').slice(0, -1).join('_')
  return userStats[statKey] || 0
}

export const checkUnlockEligibility = (
  item: UnlockableItem,
  userStats: Record<string, number>
): boolean => {
  const progress = getUnlockProgress(item.requirement, userStats)
  return progress >= item.requiredCount
}

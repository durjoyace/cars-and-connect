'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Lock, Unlock, Star, Trophy, Car, Palette, Sparkles, Filter } from 'lucide-react'
import { useMode } from '@/context/ModeContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

type UnlockType = 'car' | 'sticker' | 'badge' | 'theme' | 'feature'

interface UnlockItem {
  id: string
  name: string
  description: string
  type: UnlockType
  rarity: 'common' | 'rare' | 'legendary'
  unlockedAt?: string
  requirement: string
  icon: string
}

// Mock unlocks data
const allUnlocks: UnlockItem[] = [
  { id: '1', name: 'JDM Legend Badge', description: 'Complete 5 JDM themed challenges', type: 'badge', rarity: 'rare', unlockedAt: '2026-01-15', requirement: 'Complete 5 JDM challenges', icon: '🏆' },
  { id: '2', name: 'Drift King Sticker', description: 'Master the art of sideways driving', type: 'sticker', rarity: 'legendary', unlockedAt: '2026-01-10', requirement: 'Win 3 drift challenges', icon: '🎨' },
  { id: '3', name: 'Midnight Theme', description: 'Unlock the exclusive midnight UI theme', type: 'theme', rarity: 'rare', unlockedAt: '2026-01-08', requirement: 'Complete 10 challenges', icon: '🌙' },
  { id: '4', name: 'Garage Expansion', description: 'Add 5 more slots to your garage', type: 'feature', rarity: 'common', unlockedAt: '2026-01-05', requirement: 'Reach level 5', icon: '🔓' },
  { id: '5', name: 'Toyota Supra MK4', description: 'The iconic 2JZ beast', type: 'car', rarity: 'legendary', requirement: '7-day streak', icon: '🚗' },
  { id: '6', name: 'Neon Glow Badge', description: 'Show off your neon style', type: 'badge', rarity: 'common', unlockedAt: '2026-01-01', requirement: 'Join the platform', icon: '✨' },
  { id: '7', name: 'Muscle Maniac', description: 'Complete 3 muscle car challenges', type: 'badge', rarity: 'rare', requirement: 'Complete 3 muscle challenges', icon: '💪' },
  { id: '8', name: 'Turbo Sticker Pack', description: 'A collection of turbo-themed stickers', type: 'sticker', rarity: 'common', requirement: 'Reach level 3', icon: '🌀' },
  { id: '9', name: 'Collector Theme', description: 'Premium theme for serious collectors', type: 'theme', rarity: 'legendary', requirement: 'Own 20 cars', icon: '👑' },
  { id: '10', name: 'Priority Support', description: 'Get priority customer support', type: 'feature', rarity: 'rare', requirement: 'Refer 5 friends', icon: '⚡' },
]

const filterOptions = [
  { id: 'all', label: 'All', icon: <Sparkles size={14} /> },
  { id: 'car', label: 'Cars', icon: <Car size={14} /> },
  { id: 'badge', label: 'Badges', icon: <Trophy size={14} /> },
  { id: 'sticker', label: 'Stickers', icon: <Palette size={14} /> },
  { id: 'theme', label: 'Themes', icon: <Star size={14} /> },
  { id: 'feature', label: 'Features', icon: <Unlock size={14} /> },
]

const rarityColors = {
  common: {
    bg: 'from-slate-600/20 to-slate-700/20',
    border: 'border-slate-600/50',
    text: 'text-slate-400',
    badge: 'bg-slate-600',
  },
  rare: {
    bg: 'from-neon-blue/20 to-neon-purple/20',
    border: 'border-neon-blue/50',
    text: 'text-neon-blue',
    badge: 'bg-neon-blue',
  },
  legendary: {
    bg: 'from-neon-pink/20 to-neon-orange/20',
    border: 'border-neon-pink/50',
    text: 'text-neon-pink',
    badge: 'bg-neon-pink',
  },
}

export default function UnlocksPage() {
  const [filter, setFilter] = useState('all')
  const [showLocked, setShowLocked] = useState(true)
  const { isNostalgic } = useMode()

  const filteredUnlocks = allUnlocks.filter((unlock) => {
    if (filter !== 'all' && unlock.type !== filter) return false
    if (!showLocked && !unlock.unlockedAt) return false
    return true
  })

  const unlockedCount = allUnlocks.filter((u) => u.unlockedAt).length
  const totalCount = allUnlocks.length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      {/* Hero Header */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-green/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-4 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-xl border border-neon-green/30"
              >
                <Gift className="w-10 h-10 text-neon-green" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white">
                  {isNostalgic ? (
                    <span className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                      UNLOCKS
                    </span>
                  ) : (
                    'My Unlocks'
                  )}
                </h1>
                <p className="text-slate-400">Rewards earned through your car journey</p>
              </div>
            </div>

            {/* Progress */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 px-6 py-4 bg-neon-green/10 border border-neon-green/30 rounded-xl"
            >
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">Unlocked</p>
                <p className="text-3xl font-orbitron font-black text-neon-green">
                  {unlockedCount}/{totalCount}
                </p>
              </div>
              <div className="h-12 w-px bg-slate-700" />
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">Progress</p>
                <p className="text-lg font-bold text-white">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Type Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filterOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(option.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  filter === option.id
                    ? 'bg-neon-pink text-white shadow-[0_0_20px_rgba(255,0,110,0.4)]'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
                }`}
              >
                {option.icon}
                {option.label}
              </motion.button>
            ))}
          </div>

          {/* Show Locked Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLocked(!showLocked)}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              showLocked
                ? 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
            }`}
          >
            {showLocked ? <Lock size={14} /> : <Unlock size={14} />}
            {showLocked ? 'Showing All' : 'Unlocked Only'}
          </motion.button>
        </div>
      </motion.div>

      {/* Unlocks Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredUnlocks.map((unlock, index) => (
            <motion.div
              key={unlock.id}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <UnlockCard unlock={unlock} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredUnlocks.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-16"
        >
          <Gift size={64} className="text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-orbitron font-bold text-white mb-2">No Unlocks Found</h3>
          <p className="text-slate-400">Try adjusting your filters or complete more challenges!</p>
        </motion.div>
      )}
    </motion.div>
  )
}

function UnlockCard({ unlock }: { unlock: UnlockItem }) {
  const isUnlocked = !!unlock.unlockedAt
  const colors = rarityColors[unlock.rarity]

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${colors.bg} border ${colors.border} ${
        !isUnlocked ? 'opacity-60' : ''
      }`}
    >
      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock size={32} className="text-slate-400" />
          </motion.div>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.span
            className="text-4xl"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {unlock.icon}
          </motion.span>
          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${colors.badge} text-white`}>
            {unlock.rarity}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-orbitron font-bold text-white mb-1">{unlock.name}</h3>
        <p className="text-sm text-slate-400 mb-4">{unlock.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs">
          {isUnlocked ? (
            <span className="flex items-center gap-1 text-neon-green">
              <Unlock size={12} />
              Unlocked {new Date(unlock.unlockedAt!).toLocaleDateString()}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-500">
              <Lock size={12} />
              {unlock.requirement}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

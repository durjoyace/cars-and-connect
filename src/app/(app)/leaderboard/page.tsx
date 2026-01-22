'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Medal, Award, Flame, TrendingUp, ChevronRight, Star } from 'lucide-react'
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

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: 'TurboTyler', points: 15420, streak: 45, avatar: '🏎️', change: 0 },
  { rank: 2, name: 'DriftKing_87', points: 14850, streak: 32, avatar: '🚗', change: 2 },
  { rank: 3, name: 'JDMQueen', points: 13920, streak: 28, avatar: '🏁', change: -1 },
  { rank: 4, name: 'MuscleMike', points: 12780, streak: 21, avatar: '💪', change: 1 },
  { rank: 5, name: 'RetroRacer', points: 11650, streak: 19, avatar: '📼', change: -2 },
  { rank: 6, name: 'SpeedDemon', points: 10920, streak: 17, avatar: '⚡', change: 3 },
  { rank: 7, name: 'GearHead99', points: 10450, streak: 15, avatar: '⚙️', change: 0 },
  { rank: 8, name: 'NightRider', points: 9870, streak: 14, avatar: '🌙', change: -1 },
  { rank: 9, name: 'TrackStar', points: 9320, streak: 12, avatar: '⭐', change: 2 },
  { rank: 10, name: 'PetrolHead', points: 8890, streak: 11, avatar: '⛽', change: 0 },
]

const timeFilters = [
  { id: 'all', label: 'All Time' },
  { id: 'month', label: 'This Month' },
  { id: 'week', label: 'This Week' },
  { id: 'today', label: 'Today' },
]

export default function LeaderboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [currentUserRank] = useState(42)
  const { isNostalgic } = useMode()

  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaderboard = leaderboardData.slice(3)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      {/* Hero Header */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-yellow-500/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
              >
                <Trophy className="w-10 h-10 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white">
                  {isNostalgic ? (
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      LEADERBOARD
                    </span>
                  ) : (
                    'Leaderboard'
                  )}
                </h1>
                <p className="text-slate-400">Compete with the best car enthusiasts</p>
              </div>
            </div>

            {/* Your Rank */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 px-6 py-4 bg-neon-pink/10 border border-neon-pink/30 rounded-xl"
            >
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">Your Rank</p>
                <p className="text-3xl font-orbitron font-black text-neon-pink">#{currentUserRank}</p>
              </div>
              <div className="h-12 w-px bg-slate-700" />
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">Points to Next</p>
                <p className="text-lg font-bold text-white">1,250</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Time Filters */}
      <motion.div variants={itemVariants} className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {timeFilters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              selectedFilter === filter.id
                ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(255,229,0,0.4)]'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Podium - Top 3 */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-end justify-center gap-4 h-80">
          {/* Second Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center w-28 md:w-36"
          >
            <div className="relative mb-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 p-1 shadow-[0_0_20px_rgba(148,163,184,0.5)]"
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
                  {topThree[1]?.avatar}
                </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center border-2 border-[#0A0E27]">
                <span className="text-sm font-bold text-slate-900">2</span>
              </div>
            </div>
            <p className="font-bold text-white text-sm md:text-base text-center truncate w-full">{topThree[1]?.name}</p>
            <p className="text-slate-400 text-xs md:text-sm">{topThree[1]?.points.toLocaleString()} pts</p>
            <div className="mt-2 w-full h-32 bg-gradient-to-t from-slate-400/20 to-slate-300/10 rounded-t-xl border-t border-x border-slate-400/30 flex items-start justify-center pt-4">
              <Medal className="text-slate-300" size={28} />
            </div>
          </motion.div>

          {/* First Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center w-32 md:w-40"
          >
            <div className="relative mb-4">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 p-1 shadow-[0_0_40px_rgba(255,229,0,0.6)]"
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl">
                  {topThree[0]?.avatar}
                </div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <Crown className="text-yellow-400" size={32} />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-[#0A0E27]">
                <span className="text-sm font-bold text-yellow-900">1</span>
              </div>
            </div>
            <p className="font-bold text-white text-base md:text-lg text-center">{topThree[0]?.name}</p>
            <p className="text-yellow-400 text-sm md:text-base font-bold">{topThree[0]?.points.toLocaleString()} pts</p>
            <div className="mt-2 w-full h-44 bg-gradient-to-t from-yellow-500/20 to-yellow-400/10 rounded-t-xl border-t border-x border-yellow-500/30 flex items-start justify-center pt-4">
              <Trophy className="text-yellow-400" size={32} />
            </div>
          </motion.div>

          {/* Third Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center w-28 md:w-36"
          >
            <div className="relative mb-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 p-1 shadow-[0_0_20px_rgba(255,165,0,0.5)]"
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
                  {topThree[2]?.avatar}
                </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-[#0A0E27]">
                <span className="text-sm font-bold text-orange-900">3</span>
              </div>
            </div>
            <p className="font-bold text-white text-sm md:text-base text-center truncate w-full">{topThree[2]?.name}</p>
            <p className="text-slate-400 text-xs md:text-sm">{topThree[2]?.points.toLocaleString()} pts</p>
            <div className="mt-2 w-full h-24 bg-gradient-to-t from-orange-500/20 to-orange-400/10 rounded-t-xl border-t border-x border-orange-500/30 flex items-start justify-center pt-4">
              <Award className="text-orange-400" size={28} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Rest of Leaderboard */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 overflow-hidden">
          {restOfLeaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className={`flex items-center justify-between p-4 md:p-5 ${
                index !== restOfLeaderboard.length - 1 ? 'border-b border-slate-700/50' : ''
              } cursor-pointer transition-all`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center">
                  <span className="font-orbitron font-bold text-slate-400">{user.rank}</span>
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 flex items-center justify-center text-2xl border border-neon-pink/30">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white">{user.name}</p>
                    <div className="flex items-center gap-2">
                      <Flame size={12} className="text-orange-400" />
                      <span className="text-xs text-slate-400">{user.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Points & Change */}
              <div className="flex items-center gap-4">
                {/* Rank Change */}
                <div className="hidden md:flex items-center gap-1">
                  {user.change > 0 && (
                    <span className="flex items-center gap-1 text-neon-green text-sm">
                      <TrendingUp size={14} />
                      +{user.change}
                    </span>
                  )}
                  {user.change < 0 && (
                    <span className="flex items-center gap-1 text-red-400 text-sm">
                      <TrendingUp size={14} className="rotate-180" />
                      {user.change}
                    </span>
                  )}
                  {user.change === 0 && (
                    <span className="text-slate-500 text-sm">—</span>
                  )}
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="font-orbitron font-bold text-neon-blue text-lg">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">points</p>
                </div>

                <ChevronRight size={18} className="text-slate-600 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Position */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="rounded-xl bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 border border-neon-pink/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-neon-pink/20 flex items-center justify-center border border-neon-pink/30">
                <span className="font-orbitron font-bold text-neon-pink">#{currentUserRank}</span>
              </div>
              <div>
                <p className="font-bold text-white">Your Position</p>
                <p className="text-sm text-slate-400">Keep completing challenges to climb the ranks!</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-neon px-5 py-2.5 font-orbitron flex items-center gap-2"
            >
              <Star size={18} />
              View Challenges
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

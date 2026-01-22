'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, Trophy, Flame, Clock, Star, ChevronRight } from 'lucide-react'
import { Input, Card, Badge, Button } from '@/components/ui'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import { useMode } from '@/context/ModeContext'
import type { Challenge } from '@/types'

const themes = [
  { id: 'all', label: 'All', emoji: '🏆' },
  { id: 'gran_turismo', label: 'Gran Turismo', emoji: '🏁' },
  { id: 'fast_furious', label: 'Fast & Furious', emoji: '🔥' },
  { id: 'top_gear', label: 'Top Gear', emoji: '🇬🇧' },
  { id: 'doug_demuro', label: 'Doug DeMuro', emoji: '🤓' },
  { id: 'radwood', label: 'Radwood', emoji: '📼' },
  { id: 'bat_auction', label: 'BaT Auction', emoji: '🔨' },
]

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

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [search, setSearch] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const { isNostalgic } = useMode()

  useEffect(() => {
    fetchChallenges()
  }, [selectedTheme])

  const fetchChallenges = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedTheme !== 'all') {
        params.append('theme', selectedTheme)
      }
      const res = await fetch(`/api/challenges?${params}`)
      const data = await res.json()
      setChallenges(data)
    } catch (error) {
      console.error('Failed to fetch challenges:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredChallenges = challenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(search.toLowerCase()) ||
    challenge.description.toLowerCase().includes(search.toLowerCase())
  )

  const activeChallenges = filteredChallenges.filter((c) => c.isActive)
  const pastChallenges = filteredChallenges.filter((c) => !c.isActive)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Hero Header */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-blue/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl border border-neon-blue/30"
              >
                <Trophy className="w-8 h-8 text-neon-blue" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white">
                  {isNostalgic ? (
                    <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                      CHALLENGE HUB
                    </span>
                  ) : (
                    'Challenges'
                  )}
                </h1>
                <p className="text-slate-400">Compete, create, and connect through themed car challenges</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full"
              >
                <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-sm font-medium text-neon-green">{activeChallenges.length} Active</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full"
              >
                <Flame size={14} className="text-orange-400" />
                <span className="text-sm font-medium text-orange-400">7 Day Streak</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-neon-pink/10 border border-neon-pink/30 rounded-full"
              >
                <Star size={14} className="text-neon-pink" />
                <span className="text-sm font-medium text-neon-pink">12 Completed</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500
                           focus:outline-none focus:border-neon-blue/50 focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>

            {/* Theme Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedTheme === theme.id
                      ? 'bg-neon-pink text-white shadow-[0_0_20px_rgba(255,0,110,0.4)]'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  <span>{theme.emoji}</span>
                  <span className="hidden md:inline">{theme.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Challenge Banner */}
      {activeChallenges.length > 0 && (
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-blue/20 border border-neon-pink/30 p-6">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-neon-pink/20 rounded-full blur-[60px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="p-4 bg-neon-pink/20 rounded-xl border border-neon-pink/30"
                >
                  <Flame className="w-8 h-8 text-neon-pink" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-neon-pink text-white text-xs font-bold rounded-full uppercase">Featured</span>
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <Clock size={12} />
                      Ends in 12h
                    </span>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-white">
                    {activeChallenges[0]?.title || 'Daily Challenge'}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {activeChallenges[0]?.description || 'Complete today\'s challenge for bonus rewards!'}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-neon px-6 py-3 font-orbitron flex items-center gap-2"
              >
                Enter Challenge
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Active Challenges */}
      <motion.section variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-neon-green/20 rounded-lg">
            <span className="w-3 h-3 bg-neon-green rounded-full animate-pulse inline-block" />
          </div>
          <h2 className="text-xl font-orbitron font-bold text-white">Active Challenges</h2>
          <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs font-bold rounded-full">
            {activeChallenges.length}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-80 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
              />
            ))}
          </div>
        ) : activeChallenges.length > 0 ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
              >
                <ChallengeCard challenge={challenge} isDaily={index === 0} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-12 text-center">
            <Trophy size={48} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No active challenges match your filters</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or theme filter</p>
          </div>
        )}
      </motion.section>

      {/* Past Challenges */}
      <AnimatePresence>
        {pastChallenges.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <Clock size={16} className="text-slate-400" />
              </div>
              <h2 className="text-xl font-orbitron font-bold text-slate-400">Past Challenges</h2>
              <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs font-bold rounded-full">
                {pastChallenges.length}
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60"
            >
              {pastChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <ChallengeCard challenge={challenge} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

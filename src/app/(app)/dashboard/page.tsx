'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Gift, TrendingUp, Clock, ChevronRight, Zap, Target, Star, Users } from 'lucide-react'
import { Card, CardContent, Badge, Button, Progress } from '@/components/ui'
import { DailyChallenge } from '@/components/challenges/DailyChallenge'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import { ProgressGauge } from '@/components/ui/ProgressGauge'
import { useMode } from '@/context/ModeContext'
import Link from 'next/link'
import type { Challenge } from '@/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null)
  const [upcomingChallenges, setUpcomingChallenges] = useState<Challenge[]>([])
  const [stats, setStats] = useState({
    streak: 7,
    points: 1250,
    challengesCompleted: 12,
    unlocksEarned: 8,
  })
  const { isNostalgic } = useMode()

  useEffect(() => {
    // Fetch daily challenge
    fetch('/api/challenges?active=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setDailyChallenge(data[0])
        }
        setUpcomingChallenges(data.slice(1, 4))
      })
      .catch(console.error)

    // Fetch user stats
    fetch('/api/users/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.currentStreak !== undefined) {
          setStats({
            streak: data.currentStreak,
            points: data.totalPoints,
            challengesCompleted: data.totalChallenges,
            unlocksEarned: data.unlocksEarned,
          })
        }
      })
      .catch(console.error)
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-pink/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-neon-pink/20 border border-neon-pink/30 rounded-full mb-4"
              >
                <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-xs font-bold text-neon-pink uppercase tracking-wider">Live</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white mb-2">
                {isNostalgic ? (
                  <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                    READY TO RACE?
                  </span>
                ) : (
                  'Dashboard'
                )}
              </h1>
              <p className="text-slate-400 text-lg">
                {isNostalgic
                  ? "Today's challenge awaits. Show us what you've got!"
                  : 'Track your progress and complete challenges'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                icon={<Flame size={20} />}
                label="Streak"
                value={stats.streak}
                suffix="days"
                color="orange"
              />
              <StatCard
                icon={<Trophy size={20} />}
                label="Points"
                value={stats.points.toLocaleString()}
                color="yellow"
              />
              <StatCard
                icon={<Target size={20} />}
                label="Completed"
                value={stats.challengesCompleted}
                color="green"
              />
              <StatCard
                icon={<Gift size={20} />}
                label="Unlocks"
                value={stats.unlocksEarned}
                color="pink"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenge */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-orbitron font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-neon-pink/20 rounded-lg">
              <Zap className="text-neon-pink" size={20} />
            </div>
            Today&apos;s Challenge
          </h2>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full"
          >
            <span className="text-xs font-bold text-red-400 flex items-center gap-1">
              <Clock size={12} />
              12h 34m left
            </span>
          </motion.div>
        </div>
        <DailyChallenge challenge={dailyChallenge} />
      </motion.section>

      {/* Quick Actions */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-3">
          <div className="p-2 bg-neon-blue/20 rounded-lg">
            <Star className="text-neon-blue" size={20} />
          </div>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Build Your Garage"
            description="Create your dream collection"
            href="/garage"
            icon="🚗"
            color="pink"
          />
          <QuickActionCard
            title="Invite Friends"
            description="Grow your crew for rewards"
            href="/invite"
            icon="👥"
            color="blue"
          />
          <QuickActionCard
            title="View Unlocks"
            description="Check earned rewards"
            href="/unlocks"
            icon="🎁"
            color="green"
          />
        </div>
      </motion.section>

      {/* Progress Section - Nostalgic Mode Only */}
      {isNostalgic && (
        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50"
            >
              <div className="flex justify-center">
                <ProgressGauge value={68} label="Weekly Goal" color="#00F0FF" size="lg" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50"
            >
              <div className="flex justify-center">
                <ProgressGauge value={45} label="Monthly Rank" color="#FF006E" size="lg" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50"
            >
              <div className="flex justify-center">
                <ProgressGauge value={82} label="Collection" color="#39FF14" size="lg" />
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Upcoming Challenges */}
      {upcomingChallenges.length > 0 && (
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-orbitron font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-neon-purple/20 rounded-lg">
                <TrendingUp className="text-neon-purple" size={20} />
              </div>
              More Challenges
            </h2>
            <Link href="/challenges">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-neon-blue transition-colors"
              >
                View All <ChevronRight size={16} />
              </motion.button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Activity Feed */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-3">
          <div className="p-2 bg-neon-green/20 rounded-lg">
            <Users className="text-neon-green" size={20} />
          </div>
          Recent Activity
        </h2>
        <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-6">
          <div className="space-y-4">
            {[
              { user: 'Mike', action: 'completed', target: 'JDM Dream Team challenge', time: '2h ago', emoji: '🏆' },
              { user: 'Sarah', action: 'reacted to', target: 'your Tokyo Drift garage', time: '4h ago', emoji: '🔥' },
              { user: 'Chris', action: 'joined via', target: 'your invite', time: '1d ago', emoji: '🎉' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-slate-700/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 rounded-full flex items-center justify-center text-xl border border-neon-pink/30">
                  {activity.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-bold text-neon-blue">{activity.user}</span>{' '}
                    <span className="text-slate-400">{activity.action}</span>{' '}
                    <span className="font-medium text-neon-pink">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
                <ChevronRight size={16} className="text-slate-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  suffix?: string
  color: 'orange' | 'yellow' | 'green' | 'pink' | 'blue'
}) {
  const colors = {
    orange: {
      bg: 'from-orange-500/20 to-orange-600/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(255,107,0,0.2)]',
    },
    yellow: {
      bg: 'from-yellow-500/20 to-yellow-600/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(255,229,0,0.2)]',
    },
    green: {
      bg: 'from-green-500/20 to-green-600/10',
      border: 'border-green-500/30',
      text: 'text-neon-green',
      glow: 'shadow-[0_0_20px_rgba(57,255,20,0.2)]',
    },
    pink: {
      bg: 'from-pink-500/20 to-pink-600/10',
      border: 'border-neon-pink/30',
      text: 'text-neon-pink',
      glow: 'shadow-[0_0_20px_rgba(255,0,110,0.2)]',
    },
    blue: {
      bg: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-neon-blue/30',
      text: 'text-neon-blue',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.2)]',
    },
  }

  const style = colors[color]

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${style.bg} border ${style.border} ${style.glow} min-w-[100px]`}
    >
      <div className={`mb-2 ${style.text}`}>{icon}</div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-orbitron font-black ${style.text}`}>{value}</span>
        {suffix && <span className="text-xs text-slate-400">{suffix}</span>}
      </div>
      <span className="text-xs text-slate-500 mt-1">{label}</span>
    </motion.div>
  )
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
  color,
}: {
  title: string
  description: string
  href: string
  icon: string
  color: 'pink' | 'blue' | 'green'
}) {
  const colors = {
    pink: 'hover:border-neon-pink/50 hover:shadow-[0_0_30px_rgba(255,0,110,0.2)]',
    blue: 'hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]',
    green: 'hover:border-neon-green/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]',
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`h-full p-6 rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 cursor-pointer transition-all duration-300 ${colors[color]}`}
      >
        <motion.span
          className="text-4xl mb-4 block"
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          {icon}
        </motion.span>
        <h3 className="text-lg font-orbitron font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </motion.div>
    </Link>
  )
}

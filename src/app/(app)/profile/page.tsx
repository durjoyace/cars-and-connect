'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Car, Users, Star, Settings, Award, Target, ChevronRight, Zap } from 'lucide-react'
import { Card, Badge, Avatar, Progress, Button } from '@/components/ui'
import { ProgressGauge } from '@/components/ui/ProgressGauge'
import { useMode } from '@/context/ModeContext'
import Link from 'next/link'

interface UserStats {
  totalChallenges: number
  currentStreak: number
  totalPoints: number
  invitesSent: number
  invitesAccepted: number
  garagesCreated: number
  unlocksEarned: number
}

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

const achievements = [
  { name: 'First Challenge', emoji: '🏁', description: 'Complete your first challenge', condition: (stats: UserStats) => stats.totalChallenges >= 1 },
  { name: 'Streak Starter', emoji: '🔥', description: '3 day streak', condition: (stats: UserStats) => stats.currentStreak >= 3 },
  { name: 'Social Butterfly', emoji: '🦋', description: 'Get 5 invites accepted', condition: (stats: UserStats) => stats.invitesAccepted >= 5 },
  { name: 'JDM Legend', emoji: '🇯🇵', description: 'Complete 5 JDM challenges', condition: () => false },
  { name: 'Collector Elite', emoji: '💎', description: 'Earn 5000 points', condition: (stats: UserStats) => stats.totalPoints >= 5000 },
  { name: 'Challenge Master', emoji: '👑', description: 'Complete 10 challenges', condition: (stats: UserStats) => stats.totalChallenges >= 10 },
  { name: 'Historian', emoji: '📚', description: 'Create a vintage garage', condition: () => false },
  { name: 'Garage King', emoji: '🏰', description: 'Create 5 garages', condition: (stats: UserStats) => stats.garagesCreated >= 5 },
]

export default function ProfilePage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<UserStats | null>(null)
  const { isNostalgic } = useMode()

  useEffect(() => {
    fetch('/api/users/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
  }, [])

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-12"
        >
          <Users size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Please sign in to view your profile</p>
        </motion.div>
      </div>
    )
  }

  const earnedAchievements = stats ? achievements.filter(a => a.condition(stats)).length : 0
  const level = Math.floor((stats?.totalPoints || 0) / 1000) + 1

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-purple/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                      {session.user?.name?.[0] || '?'}
                    </div>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-10 h-10 bg-neon-green rounded-full flex items-center justify-center border-4 border-[#0A0E27]"
              >
                <span className="text-lg font-bold text-black">{level}</span>
              </motion.div>
            </motion.div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-orbitron font-black text-white mb-2">
                {session.user?.name || 'Car Enthusiast'}
              </h1>
              <p className="text-slate-400 mb-4">{session.user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-neon-purple/20 text-neon-purple text-sm font-bold rounded-full border border-neon-purple/30"
                >
                  Level {level}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-neon-pink/20 text-neon-pink text-sm font-bold rounded-full border border-neon-pink/30"
                >
                  JDM Enthusiast
                </motion.span>
                {stats && stats.currentStreak >= 7 && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-bold rounded-full border border-orange-500/30 flex items-center gap-1"
                  >
                    <Flame size={14} />
                    {stats.currentStreak} Day Streak
                  </motion.span>
                )}
              </div>
            </div>

            {/* Settings Button */}
            <Link href="/profile/settings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-neon-blue/50 transition-all flex items-center gap-2"
              >
                <Settings size={18} />
                Settings
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Trophy size={24} />}
          label="Points"
          value={stats?.totalPoints?.toLocaleString() || '0'}
          color="yellow"
        />
        <StatCard
          icon={<Flame size={24} />}
          label="Streak"
          value={`${stats?.currentStreak || 0}`}
          suffix="days"
          color="orange"
        />
        <StatCard
          icon={<Car size={24} />}
          label="Garages"
          value={stats?.garagesCreated?.toString() || '0'}
          color="pink"
        />
        <StatCard
          icon={<Users size={24} />}
          label="Invites"
          value={stats?.invitesAccepted?.toString() || '0'}
          color="blue"
        />
      </motion.div>

      {/* Progress Gauges - Nostalgic Mode */}
      {isNostalgic && (
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-4 flex justify-center">
            <ProgressGauge value={Math.min((stats?.totalPoints || 0) / 50, 100)} label="Level Progress" color="#00F0FF" size="sm" />
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-4 flex justify-center">
            <ProgressGauge value={(earnedAchievements / achievements.length) * 100} label="Achievements" color="#FF006E" size="sm" />
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-4 flex justify-center">
            <ProgressGauge value={Math.min((stats?.currentStreak || 0) * 10, 100)} label="Streak" color="#39FF14" size="sm" />
          </div>
        </motion.div>
      )}

      {/* Achievements */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Award className="text-yellow-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-orbitron font-bold text-white">Achievements</h2>
                <p className="text-sm text-slate-400">{earnedAchievements} / {achievements.length} unlocked</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-neon-blue transition-colors"
            >
              View All <ChevronRight size={16} />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const isEarned = stats ? achievement.condition(stats) : false
              return (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-4 rounded-xl text-center transition-all cursor-pointer ${
                    isEarned
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 shadow-[0_0_20px_rgba(255,229,0,0.2)]'
                      : 'bg-slate-800/30 border border-slate-700/30 opacity-50'
                  }`}
                >
                  <motion.span
                    className="text-4xl block mb-2"
                    animate={isEarned ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 1, repeat: isEarned ? Infinity : 0, repeatDelay: 2 }}
                  >
                    {achievement.emoji}
                  </motion.span>
                  <p className={`text-sm font-bold ${isEarned ? 'text-white' : 'text-slate-500'}`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-neon-green/20 rounded-lg">
              <Zap className="text-neon-green" size={24} />
            </div>
            <h2 className="text-xl font-orbitron font-bold text-white">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            {[
              { action: 'Completed', target: 'JDM Dream Team Challenge', points: '+200', time: '2 hours ago', color: 'green' },
              { action: 'Created', target: 'Tokyo Drift Garage', points: '+50', time: '1 day ago', color: 'blue' },
              { action: 'Unlocked', target: 'Radwood Theme', points: '+100', time: '3 days ago', color: 'pink' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.02)' }}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer"
              >
                <div>
                  <p className="text-white">
                    <span className="text-slate-400">{activity.action}</span>{' '}
                    <span className={`font-bold ${
                      activity.color === 'green' ? 'text-neon-green' :
                      activity.color === 'blue' ? 'text-neon-blue' : 'text-neon-pink'
                    }`}>{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
                <span className="px-3 py-1 bg-neon-green/20 text-neon-green text-sm font-bold rounded-full border border-neon-green/30">
                  {activity.points}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
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
  value: string
  suffix?: string
  color: 'yellow' | 'orange' | 'pink' | 'blue'
}) {
  const colors = {
    yellow: {
      bg: 'from-yellow-500/20 to-yellow-600/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(255,229,0,0.2)]',
    },
    orange: {
      bg: 'from-orange-500/20 to-orange-600/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      glow: 'shadow-[0_0_20px_rgba(255,107,0,0.2)]',
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
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-5 rounded-xl bg-gradient-to-br ${style.bg} border ${style.border} ${style.glow} text-center`}
    >
      <div className={`flex justify-center mb-3 ${style.text}`}>{icon}</div>
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-2xl font-orbitron font-black ${style.text}`}>{value}</span>
        {suffix && <span className="text-xs text-slate-400">{suffix}</span>}
      </div>
      <p className="text-xs text-slate-400 mt-2">{label}</p>
    </motion.div>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Trophy, Flame, Car, Users, Star, Settings } from 'lucide-react'
import { Card, Badge, Avatar, Progress, Button } from '@/components/ui'
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

export default function ProfilePage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<UserStats | null>(null)

  useEffect(() => {
    fetch('/api/users/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
  }, [])

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-gray-400">Please sign in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card variant="glass" className="p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar
            src={session.user?.image}
            name={session.user?.name}
            size="xl"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">
              {session.user?.name || 'Car Enthusiast'}
            </h1>
            <p className="text-gray-400 mb-4">{session.user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="neon">Level 5</Badge>
              <Badge variant="legendary">JDM Enthusiast</Badge>
              {stats && stats.currentStreak >= 7 && (
                <Badge variant="warning">🔥 {stats.currentStreak} Day Streak</Badge>
              )}
            </div>
          </div>
          <Link href="/profile/settings">
            <Button variant="ghost">
              <Settings size={20} className="mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Trophy className="text-yellow-400" />}
          label="Points"
          value={stats?.totalPoints?.toLocaleString() || '0'}
        />
        <StatCard
          icon={<Flame className="text-orange-400" />}
          label="Streak"
          value={`${stats?.currentStreak || 0} days`}
        />
        <StatCard
          icon={<Car className="text-neon-pink" />}
          label="Garages"
          value={stats?.garagesCreated?.toString() || '0'}
        />
        <StatCard
          icon={<Users className="text-neon-blue" />}
          label="Invites"
          value={stats?.invitesAccepted?.toString() || '0'}
        />
      </div>

      {/* Achievements */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Challenge', emoji: '🏁', earned: true },
            { name: 'Streak Starter', emoji: '🔥', earned: true },
            { name: 'Social Butterfly', emoji: '🦋', earned: (stats?.invitesAccepted || 0) >= 5 },
            { name: 'JDM Legend', emoji: '🇯🇵', earned: false },
            { name: 'Collector Elite', emoji: '💎', earned: false },
            { name: 'Challenge Master', emoji: '👑', earned: (stats?.totalChallenges || 0) >= 10 },
            { name: 'Historian', emoji: '📚', earned: false },
            { name: 'Garage King', emoji: '🏰', earned: (stats?.garagesCreated || 0) >= 5 },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`p-4 rounded-xl text-center ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                  : 'bg-retro-purple/20 opacity-50'
              }`}
            >
              <span className="text-3xl block mb-2">{achievement.emoji}</span>
              <p className={`text-sm font-medium ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Completed', target: 'JDM Dream Team Challenge', points: '+200', time: '2 hours ago' },
            { action: 'Created', target: 'Tokyo Drift Garage', points: '+50', time: '1 day ago' },
            { action: 'Unlocked', target: 'Radwood Theme', points: '+100', time: '3 days ago' },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-retro-purple/20 rounded-lg"
            >
              <div>
                <p className="text-white">
                  <span className="text-gray-400">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Badge variant="success" size="sm">{activity.points}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <Card className="p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </Card>
  )
}

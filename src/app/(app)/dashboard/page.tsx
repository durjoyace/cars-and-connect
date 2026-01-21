'use client'

import { useState, useEffect } from 'react'
import { Trophy, Flame, Gift, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent, Badge, Button, Progress } from '@/components/ui'
import { DailyChallenge } from '@/components/challenges/DailyChallenge'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import Link from 'next/link'
import type { Challenge } from '@/types'

export default function DashboardPage() {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null)
  const [upcomingChallenges, setUpcomingChallenges] = useState<Challenge[]>([])
  const [stats, setStats] = useState({
    streak: 7,
    points: 1250,
    challengesCompleted: 12,
    unlocksEarned: 8,
  })

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Ready for today&apos;s challenge?</p>
        </div>

        <div className="flex gap-4">
          <StatCard
            icon={<Flame className="text-orange-400" />}
            label="Streak"
            value={`${stats.streak} days`}
            color="orange"
          />
          <StatCard
            icon={<Trophy className="text-yellow-400" />}
            label="Points"
            value={stats.points.toLocaleString()}
            color="yellow"
          />
          <StatCard
            icon={<Gift className="text-neon-pink" />}
            label="Unlocks"
            value={stats.unlocksEarned.toString()}
            color="pink"
          />
        </div>
      </div>

      {/* Daily Challenge */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="text-neon-pink" size={24} />
            Today&apos;s Challenge
          </h2>
        </div>
        <DailyChallenge challenge={dailyChallenge} />
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Build Your Garage"
          description="Create a new garage or add to existing ones"
          href="/garage"
          icon="🚗"
        />
        <QuickActionCard
          title="Invite Friends"
          description="Unlock features by growing your crew"
          href="/invite"
          icon="👥"
        />
        <QuickActionCard
          title="View Unlocks"
          description="Check your progress and earned rewards"
          href="/unlocks"
          icon="🎁"
        />
      </section>

      {/* Upcoming Challenges */}
      {upcomingChallenges.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-neon-blue" size={24} />
              More Challenges
            </h2>
            <Link href="/challenges">
              <Button variant="ghost" size="sm">
                View All <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      )}

      {/* Activity Feed Placeholder */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[
              { user: 'Mike', action: 'completed', target: 'JDM Dream Team challenge', time: '2h ago' },
              { user: 'Sarah', action: 'reacted to', target: 'your Tokyo Drift garage', time: '4h ago' },
              { user: 'Chris', action: 'joined via', target: 'your invite', time: '1d ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-retro-purple/20 rounded-lg">
                <div className="w-10 h-10 bg-retro-purple rounded-full flex items-center justify-center text-white font-bold">
                  {activity.user[0]}
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-400">{activity.action}</span>{' '}
                    <span className="text-neon-pink">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-retro-dark/50 rounded-xl border border-retro-purple/30">
      <div className="p-2 bg-retro-purple/30 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <Link href={href}>
      <Card hover className="p-5 h-full">
        <span className="text-3xl mb-3 block">{icon}</span>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </Card>
    </Link>
  )
}

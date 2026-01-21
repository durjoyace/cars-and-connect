'use client'

import { useState, useEffect } from 'react'
import { Filter, Search } from 'lucide-react'
import { Input, Card, Badge, Button } from '@/components/ui'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import type { Challenge } from '@/types'

const themes = [
  { id: 'all', label: 'All Themes' },
  { id: 'gran_turismo', label: '🏁 Gran Turismo' },
  { id: 'fast_furious', label: '🔥 Fast & Furious' },
  { id: 'top_gear', label: '🇬🇧 Top Gear' },
  { id: 'doug_demuro', label: '🤓 Doug DeMuro' },
  { id: 'radwood', label: '📼 Radwood' },
  { id: 'bat_auction', label: '🔨 BaT Auction' },
]

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [search, setSearch] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Challenges</h1>
        <p className="text-gray-400">Compete, create, and connect through themed car challenges</p>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search challenges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedTheme === theme.id
                    ? 'bg-neon-pink text-white'
                    : 'bg-retro-purple/30 text-gray-400 hover:text-white'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Active Challenges */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          Active Challenges
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-80 animate-pulse bg-retro-purple/20" />
            ))}
          </div>
        ) : activeChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isDaily={index === 0}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-400">No active challenges match your filters</p>
          </Card>
        )}
      </section>

      {/* Past Challenges */}
      {pastChallenges.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4 text-gray-400">
            Past Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
            {pastChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

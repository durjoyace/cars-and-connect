'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, Clock, Trophy, ChevronRight, Sparkles } from 'lucide-react'
import { Card, Badge, Button, Progress } from '@/components/ui'
import { cn, formatCurrency, getThemeEmoji } from '@/lib/utils'
import type { Challenge } from '@/types'

interface DailyChallengeProps {
  challenge: Challenge | null
}

export function DailyChallenge({ challenge }: DailyChallengeProps) {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!challenge) return

    const updateCountdown = () => {
      const now = new Date()
      const end = new Date(challenge.endsAt)
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown('Challenge Ended')
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [challenge])

  if (!challenge) {
    return (
      <Card variant="glass\" className="p-8 text-center">
        <Sparkles className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Active Challenge</h3>
        <p className="text-gray-400">Check back soon for the next daily challenge!</p>
      </Card>
    )
  }

  return (
    <Card variant="neon" className="overflow-hidden">
      <div className="relative">
        {/* Background Image */}
        {challenge.imageUrl && (
          <div className="absolute inset-0">
            <Image
              src={challenge.imageUrl}
              alt={challenge.title}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-retro-dark via-retro-dark/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-neon-pink/20 rounded-lg">
                  <Zap className="w-6 h-6 text-neon-pink animate-pulse" />
                </div>
                <div>
                  <Badge variant="neon" size="sm">Daily Challenge</Badge>
                  <p className="text-xs text-gray-400 mt-1">
                    {getThemeEmoji(challenge.theme)} {challenge.theme.replace('_', ' ')} themed
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {challenge.title}
              </h2>
              <p className="text-gray-300 mb-4 max-w-xl">
                {challenge.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {challenge.budgetLimit && (
                  <div className="flex items-center gap-2 text-neon-green">
                    <span className="font-medium">Budget:</span>
                    <span className="font-bold">{formatCurrency(challenge.budgetLimit)}</span>
                  </div>
                )}
                {challenge.eraStart && challenge.eraEnd && (
                  <div className="flex items-center gap-2 text-neon-blue">
                    <span className="font-medium">Era:</span>
                    <span className="font-bold">{challenge.eraStart} - {challenge.eraEnd}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-yellow-400">
                  <Trophy size={16} />
                  <span className="font-bold">{challenge.points} points</span>
                </div>
              </div>
            </div>

            {/* Right Side - Timer & Action */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              {/* Countdown */}
              <div className="text-center lg:text-right">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1 justify-center lg:justify-end">
                  <Clock size={12} />
                  Time Remaining
                </p>
                <div className="font-mono text-3xl lg:text-4xl font-bold text-white tracking-wider">
                  {countdown}
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/challenges/${challenge.id}`}>
                <Button variant="neon" size="lg" className="group">
                  Start Building
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Bar (if applicable) */}
        <div className="px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Community Progress</span>
            <span>142 submissions</span>
          </div>
          <Progress value={142} max={500} variant="neon" />
        </div>
      </div>
    </Card>
  )
}

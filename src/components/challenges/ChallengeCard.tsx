'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, Zap, Trophy } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import { cn, formatCurrency, getThemeEmoji, getDifficultyColor } from '@/lib/utils'
import type { Challenge } from '@/types'

interface ChallengeCardProps {
  challenge: Challenge
  isDaily?: boolean
}

export function ChallengeCard({ challenge, isDaily = false }: ChallengeCardProps) {
  const timeRemaining = getTimeRemaining(challenge.endsAt)

  return (
    <Card variant={isDaily ? 'neon' : 'default'} hover className="group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {challenge.imageUrl && (
          <Image
            src={challenge.imageUrl}
            alt={challenge.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isDaily && (
            <Badge variant="neon" size="sm">
              <Zap size={12} className="mr-1" />
              Daily
            </Badge>
          )}
          <Badge variant="default" size="sm">
            {getThemeEmoji(challenge.theme)} {challenge.theme.replace('_', ' ')}
          </Badge>
        </div>

        {/* Points */}
        <div className="absolute top-3 right-3">
          <Badge variant="warning" size="sm">
            <Trophy size={12} className="mr-1" />
            {challenge.points} pts
          </Badge>
        </div>

        {/* Difficulty */}
        <div className="absolute bottom-3 right-3">
          <span className={cn('px-2 py-1 rounded text-xs font-bold text-white', getDifficultyColor(challenge.difficulty))}>
            {challenge.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-pink transition-colors">
          {challenge.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {challenge.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {timeRemaining}
            </span>
            {challenge.budgetLimit && (
              <span className="text-neon-green">
                {formatCurrency(challenge.budgetLimit)} budget
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="mt-4">
          <Link href={`/challenges/${challenge.id}`}>
            <Button variant={isDaily ? 'neon' : 'primary'} className="w-full">
              {isDaily ? 'Start Challenge' : 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

function getTimeRemaining(endDate: Date): string {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) return 'Ended'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days}d left`
  }

  return `${hours}h ${minutes}m left`
}

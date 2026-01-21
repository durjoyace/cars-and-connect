'use client'

import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  variant?: 'default' | 'neon' | 'racing'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const variants = {
    default: 'bg-retro-accent',
    neon: 'bg-gradient-to-r from-neon-pink via-neon-blue to-neon-pink animate-neon-pulse',
    racing: 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-retro-purple/30 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}

export function GaugeProgress({ value, max = 100, label }: { value: number; max?: number; label?: string }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const rotation = (percentage / 100) * 180 - 90

  return (
    <div className="relative w-32 h-16 overflow-hidden">
      <div className="absolute inset-0 border-8 border-retro-purple/30 rounded-t-full" />
      <div
        className="absolute bottom-0 left-1/2 w-1 h-14 bg-neon-pink origin-bottom transition-transform duration-500"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-retro-dark rounded-full border-2 border-neon-pink" />
      {label && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-neon-pink">
          {label}
        </div>
      )}
    </div>
  )
}

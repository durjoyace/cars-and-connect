'use client'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neon' | 'legendary' | 'rare' | 'uncommon'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full'

  const variants = {
    default: 'bg-retro-purple text-gray-200',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    neon: 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50 animate-neon-pulse',
    legendary: 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-lg shadow-purple-500/20',
    rare: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    uncommon: 'bg-green-500/20 text-green-400 border border-green-500/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}

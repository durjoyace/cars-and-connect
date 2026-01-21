'use client'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'neon' | 'glass' | 'garage'
  hover?: boolean
}

export function Card({ className, variant = 'default', hover = false, children, ...props }: CardProps) {
  const baseStyles = 'rounded-xl overflow-hidden'

  const variants = {
    default: 'bg-retro-dark border border-retro-purple/30',
    neon: 'bg-retro-dark border-2 border-neon-pink/50 shadow-lg shadow-neon-pink/20',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
    garage: 'bg-gradient-to-br from-garage-metal to-retro-dark border border-garage-chrome/20',
  }

  const hoverStyles = hover
    ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
    : ''

  return (
    <div className={cn(baseStyles, variants[variant], hoverStyles, className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4 border-b border-white/10', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4 border-t border-white/10 bg-black/20', className)} {...props}>
      {children}
    </div>
  )
}

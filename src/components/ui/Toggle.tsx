'use client'

import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  variant?: 'default' | 'neon'
  disabled?: boolean
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  variant = 'default',
  disabled = false,
}: ToggleProps) {
  const variants = {
    default: {
      track: checked ? 'bg-retro-accent' : 'bg-retro-purple',
      thumb: 'bg-white',
    },
    neon: {
      track: checked ? 'bg-neon-pink shadow-lg shadow-neon-pink/50' : 'bg-retro-purple',
      thumb: checked ? 'bg-white shadow-lg shadow-neon-pink/50' : 'bg-gray-300',
    },
  }

  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          variants[variant].track
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 rounded-full transition-transform duration-200',
            variants[variant].thumb,
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-white">{label}</span>}
          {description && <span className="text-xs text-gray-400">{description}</span>}
        </div>
      )}
    </label>
  )
}

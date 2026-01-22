'use client'

import { motion } from 'framer-motion'

interface ProgressGaugeProps {
  value: number // 0 to 100
  label: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function ProgressGauge({
  value,
  label,
  color = '#00F0FF',
  size = 'md',
  showValue = true,
}: ProgressGaugeProps) {
  const sizes = {
    sm: { container: 80, stroke: 6, fontSize: 'text-lg' },
    md: { container: 120, stroke: 8, fontSize: 'text-2xl' },
    lg: { container: 160, stroke: 10, fontSize: 'text-3xl' },
  }

  const config = sizes[size]
  const radius = config.container / 2 - config.stroke - 5
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: config.container,
          height: config.container,
        }}
      >
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#1e293b"
            strokeWidth={config.stroke}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={config.stroke}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>

        {/* Center Text */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`${config.fontSize} font-black font-orbitron`}
              style={{ color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {value}%
            </motion.span>
          </div>
        )}
      </div>
      <span className="mt-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
        {label}
      </span>
    </div>
  )
}

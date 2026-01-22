'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Star, Gift, Car } from 'lucide-react'

interface UnlockAnimationProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  image?: string
  type: 'car' | 'sticker' | 'badge' | 'theme' | 'feature'
}

const typeIcons = {
  car: Car,
  sticker: Star,
  badge: Trophy,
  theme: Gift,
  feature: Star,
}

const typeColors = {
  car: '#FF006E',
  sticker: '#00F0FF',
  badge: '#FFE500',
  theme: '#BF00FF',
  feature: '#39FF14',
}

export function UnlockAnimation({
  isOpen,
  onClose,
  title,
  description,
  image,
  type,
}: UnlockAnimationProps) {
  const Icon = typeIcons[type]
  const color = typeColors[type]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#0A0E27] border-2 border-neon-pink rounded-xl p-8 shadow-[0_0_50px_rgba(255,0,110,0.3)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon with animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6 p-5 rounded-full shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                    boxShadow: `0 0 30px ${color}50`,
                  }}
                >
                  <Icon size={48} style={{ color }} />
                </motion.div>

                {/* Unlock Text */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-black italic text-neon-pink mb-2 font-orbitron"
                >
                  UNLOCKED!
                </motion.h2>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-white mb-4"
                >
                  {title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-300 mb-8"
                >
                  {description}
                </motion.p>

                {/* Collect Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 rounded-lg btn-neon font-orbitron"
                >
                  Collect Reward
                </motion.button>
              </div>

              {/* Background Decorations */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-neon-pink rounded-full blur-[100px] opacity-20" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-neon-blue rounded-full blur-[100px] opacity-20" />

              {/* Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#00F0FF' : '#FF006E',
                    left: `${20 + i * 12}%`,
                    top: '20%',
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

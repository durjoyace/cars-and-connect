'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/context/ModeContext'
import { Zap, BookOpen } from 'lucide-react'

export function ModeToggle() {
  const { mode, toggleMode } = useMode()

  return (
    <button
      onClick={toggleMode}
      className="relative flex items-center bg-slate-800/80 rounded-full p-1 border border-slate-600 w-28 h-9 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all hover:border-slate-500"
      aria-label={`Switch to ${mode === 'nostalgic' ? 'serious' : 'nostalgic'} mode`}
    >
      {/* Background Indicator */}
      <motion.div
        className={`absolute w-12 h-7 rounded-full ${
          mode === 'nostalgic'
            ? 'bg-neon-pink shadow-[0_0_15px_rgba(255,0,110,0.5)]'
            : 'bg-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.5)]'
        }`}
        initial={false}
        animate={{
          x: mode === 'nostalgic' ? 2 : 54,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />

      {/* Icons/Text */}
      <div className="flex justify-between w-full px-2 z-10 text-[10px] font-bold">
        <span
          className={`flex items-center justify-center w-1/2 transition-colors duration-300 ${
            mode === 'nostalgic' ? 'text-white' : 'text-slate-400'
          }`}
        >
          <Zap size={12} className="mr-0.5" />
          FUN
        </span>
        <span
          className={`flex items-center justify-center w-1/2 transition-colors duration-300 ${
            mode === 'serious' ? 'text-black font-black' : 'text-slate-400'
          }`}
        >
          DATA
          <BookOpen size={12} className="ml-0.5" />
        </span>
      </div>
    </button>
  )
}

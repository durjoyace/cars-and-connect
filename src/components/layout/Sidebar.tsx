'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Trophy,
  Car,
  Users,
  Gift,
  Settings,
  BarChart3,
  Flame,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { useMode } from '@/context/ModeContext'
import { ProgressGauge } from '@/components/ui/ProgressGauge'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'My Garage', href: '/garage', icon: Car },
  { name: 'Invite Friends', href: '/invite', icon: Users },
  { name: 'Unlocks', href: '/unlocks', icon: Gift },
  { name: 'Leaderboard', href: '/leaderboard', icon: BarChart3 },
  { name: 'Settings', href: '/profile/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { showNeonEffects } = useStore()
  const { isNostalgic } = useMode()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:pt-16 bg-[#0A0E27]/80 backdrop-blur-xl border-r border-neon-pink/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-neon-pink/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-blue/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto relative z-10">
        {/* Streak Display */}
        <div className="px-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30',
              'shadow-[0_0_30px_rgba(255,107,0,0.2)]'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Flame className="w-6 h-6 text-orange-400" />
                </motion.div>
                <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">Streak</span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">Best: 14</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-orbitron font-black text-white">7</span>
              <span className="text-lg text-orange-400 font-medium mb-1">days</span>
            </div>
            <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">7 more days until bonus reward!</p>
          </motion.div>
        </div>

        {/* Weekly Progress */}
        {isNostalgic && (
          <div className="px-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <ProgressGauge value={68} label="Weekly Goal" color="#00F0FF" size="md" />
            </motion.div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-neon-pink/20 to-transparent text-neon-pink border-l-4 border-neon-pink shadow-[0_0_20px_rgba(255,0,110,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={cn(
                        'transition-all duration-300',
                        isActive ? 'text-neon-pink' : 'text-slate-500 group-hover:text-neon-blue'
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={cn(
                      'transition-all duration-300 opacity-0 group-hover:opacity-100',
                      isActive ? 'opacity-100 text-neon-pink' : 'text-slate-500'
                    )}
                  />
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Display Mode */}
        <div className="px-4 py-4 border-t border-slate-700/50 mt-4">
          <p className="text-xs text-slate-500 mb-3 px-2 uppercase tracking-wider font-bold">Display Mode</p>
          <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <ModeButton mode="pop_culture" label="Pop" emoji="🎬" />
            <ModeButton mode="balanced" label="Mix" emoji="⚡" />
            <ModeButton mode="collector" label="Data" emoji="📊" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 pt-4 border-t border-slate-700/50">
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50"
            >
              <p className="text-xs text-slate-500">Cars</p>
              <p className="text-xl font-orbitron font-bold text-neon-blue">12</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50"
            >
              <p className="text-xs text-slate-500">Rank</p>
              <p className="text-xl font-orbitron font-bold text-neon-green">#42</p>
            </motion.div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function ModeButton({ mode, label, emoji }: { mode: string; label: string; emoji: string }) {
  const { displayMode, setDisplayMode } = useStore()
  const isActive = displayMode === mode

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setDisplayMode(mode as any)}
      className={cn(
        'flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs font-bold rounded-lg transition-all duration-300',
        isActive
          ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,110,0.4)]'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      )}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </motion.button>
  )
}

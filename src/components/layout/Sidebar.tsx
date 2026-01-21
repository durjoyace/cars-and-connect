'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Trophy,
  Car,
  Users,
  Gift,
  Settings,
  BarChart3,
  Flame,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'My Garage', href: '/garage', icon: Car },
  { name: 'Invite Friends', href: '/invite', icon: Users },
  { name: 'Unlocks', href: '/unlocks', icon: Gift },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
  { name: 'Settings', href: '/profile/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { showNeonEffects } = useStore()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-retro-dark border-r border-retro-purple/30">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Streak Display */}
        <div className="px-4 mb-6">
          <div className={cn(
            'p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30',
            showNeonEffects && 'shadow-lg shadow-orange-500/20'
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Current Streak</span>
            </div>
            <p className="text-3xl font-bold text-white">7 Days</p>
            <p className="text-xs text-gray-400 mt-1">Keep it going!</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mode Toggle */}
        <div className="px-4 py-4 border-t border-retro-purple/30">
          <p className="text-xs text-gray-500 mb-2 px-2">Display Mode</p>
          <div className="flex gap-1 p-1 bg-retro-purple/30 rounded-lg">
            <ModeButton mode="pop_culture" label="Pop" />
            <ModeButton mode="balanced" label="Mix" />
            <ModeButton mode="collector" label="Collector" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function ModeButton({ mode, label }: { mode: string; label: string }) {
  const { displayMode, setDisplayMode } = useStore()
  const isActive = displayMode === mode

  return (
    <button
      onClick={() => setDisplayMode(mode as any)}
      className={cn(
        'flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all',
        isActive
          ? 'bg-neon-pink text-white'
          : 'text-gray-400 hover:text-white'
      )}
    >
      {label}
    </button>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Bell, Settings, LogOut, User, Trophy, Car, Users, X, Home, Flame } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Avatar } from '@/components/ui'
import { ModeToggle } from '@/components/ui/ModeToggle'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'Garage', href: '/garage', icon: Car },
  { name: 'Invite', href: '/invite', icon: Users },
]

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0A0E27]/95 backdrop-blur-xl border-b border-neon-pink/20 shadow-[0_4px_30px_rgba(255,0,110,0.1)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center
                           shadow-[0_0_20px_rgba(255,0,110,0.4)] group-hover:shadow-[0_0_30px_rgba(255,0,110,0.6)]"
              >
                <Car className="w-6 h-6 text-white" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-orbitron font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                  CARS & CONNECTION
                </span>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-neon-pink to-neon-blue transition-all duration-300" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2',
                      isActive
                        ? 'text-neon-pink'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <item.icon size={16} />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-neon-pink/10 border border-neon-pink/30 rounded-lg -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <div className="hidden sm:block">
                <ModeToggle />
              </div>

              {session ? (
                <>
                  {/* Streak Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20
                               border border-orange-500/30 rounded-full"
                  >
                    <Flame size={14} className="text-orange-400" />
                    <span className="text-xs font-bold text-orange-400">7</span>
                  </motion.div>

                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2 text-slate-400 hover:text-neon-blue transition-colors"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
                  </motion.button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className={cn(
                        'flex items-center gap-2 p-1 rounded-full transition-all',
                        isProfileOpen && 'ring-2 ring-neon-pink/50'
                      )}
                    >
                      <Avatar
                        src={session.user?.image}
                        name={session.user?.name}
                        size="sm"
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-60 bg-[#0A0E27] border border-neon-pink/30 rounded-xl
                                     shadow-[0_10px_40px_rgba(255,0,110,0.2)] overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-slate-700/50 bg-gradient-to-r from-neon-pink/10 to-transparent">
                            <p className="text-sm font-bold text-white">{session.user?.name}</p>
                            <p className="text-xs text-slate-400">{session.user?.email}</p>
                          </div>
                          <div className="py-2">
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <User size={16} />
                              <span className="text-sm">My Profile</span>
                            </Link>
                            <Link
                              href="/profile/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Settings size={16} />
                              <span className="text-sm">Settings</span>
                            </Link>
                          </div>
                          <div className="border-t border-slate-700/50 py-2">
                            <button
                              onClick={() => signOut()}
                              className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors"
                            >
                              <LogOut size={16} />
                              <span className="text-sm">Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/signin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link href="/auth/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-neon px-4 py-2 text-sm font-orbitron"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#0A0E27] border-l border-neon-pink/30 z-50 md:hidden
                         shadow-[-10px_0_40px_rgba(255,0,110,0.2)]"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <span className="font-orbitron font-bold text-neon-pink">MENU</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                {/* Mode Toggle */}
                <div className="p-4 border-b border-slate-700/50">
                  <ModeToggle />
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                            isActive
                              ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon size={20} />
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* User Section */}
                {session && (
                  <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar src={session.user?.image} name={session.user?.name} size="md" />
                      <div>
                        <p className="font-medium text-white">{session.user?.name}</p>
                        <p className="text-xs text-slate-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30
                                 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

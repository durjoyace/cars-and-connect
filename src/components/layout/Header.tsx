'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Bell, Settings, LogOut, User, Trophy, Car, Users } from 'lucide-react'
import { useState } from 'react'
import { Button, Avatar } from '@/components/ui'
import { cn } from '@/lib/utils'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-retro-black/90 backdrop-blur-lg border-b border-retro-purple/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent hidden sm:block">
              Cars & Connection
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Trophy size={18} />
              Challenges
            </Link>
            <Link
              href="/garage"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Car size={18} />
              My Garage
            </Link>
            <Link
              href="/invite"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Users size={18} />
              Invite
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2"
                  >
                    <Avatar
                      src={session.user?.image}
                      name={session.user?.name}
                      size="sm"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-retro-dark border border-retro-purple/50 rounded-xl shadow-xl py-2">
                      <div className="px-4 py-2 border-b border-retro-purple/30">
                        <p className="text-sm font-medium text-white">{session.user?.name}</p>
                        <p className="text-xs text-gray-400">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <Link
                        href="/profile/settings"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <hr className="my-2 border-retro-purple/30" />
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 w-full"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="neon" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-retro-dark border-t border-retro-purple/30">
          <nav className="px-4 py-4 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy size={18} />
              Challenges
            </Link>
            <Link
              href="/garage"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Car size={18} />
              My Garage
            </Link>
            <Link
              href="/invite"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} />
              Invite
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

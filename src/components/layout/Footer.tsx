'use client'

import Link from 'next/link'
import { Car, Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-retro-black border-t border-retro-purple/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-pink to-neon-blue rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                Cars & Connection
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Real car culture meets pop nostalgia. Daily challenges, authentic car data,
              and a community that respects both the Fast & Furious fan and the registry nerd.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Daily Challenge
                </Link>
              </li>
              <li>
                <Link href="/garage" className="text-gray-400 hover:text-neon-pink transition-colors">
                  My Garage
                </Link>
              </li>
              <li>
                <Link href="/invite" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Invite Friends
                </Link>
              </li>
              <li>
                <Link href="/unlocks" className="text-gray-400 hover:text-neon-pink transition-colors">
                  Unlockables
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-retro-purple rounded-lg text-gray-400 hover:text-neon-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-retro-purple rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-retro-purple/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Cars & Connection. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

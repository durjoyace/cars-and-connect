'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="fixed top-20 left-20 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="fixed bottom-20 right-20 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="fixed top-1/2 right-1/3 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Scanlines Overlay */}
      <div className="scanlines pointer-events-none" />

      {/* Content */}
      <Header />
      <div className="flex pt-16 relative z-10">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 lg:ml-72 p-4 md:p-6 min-h-[calc(100vh-4rem)]"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, Plus, Check, History, Award, Zap, Car as CarIcon } from 'lucide-react'
import { Card, Badge, Button, Modal } from '@/components/ui'
import { cn, formatCurrency, getRarityColor } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { useMode } from '@/context/ModeContext'
import type { Car as CarType } from '@/types'

interface CarCardProps {
  car: CarType
  selectable?: boolean
  selected?: boolean
  onSelect?: (car: CarType) => void
  showDetails?: boolean
}

const rarityConfig = {
  common: {
    gradient: 'from-slate-600 to-slate-700',
    glow: 'shadow-none',
    border: 'border-slate-600',
    badge: 'bg-slate-600',
  },
  rare: {
    gradient: 'from-neon-blue/20 to-neon-purple/20',
    glow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
    border: 'border-neon-blue',
    badge: 'bg-neon-blue',
  },
  legendary: {
    gradient: 'from-neon-pink/20 to-neon-orange/20',
    glow: 'shadow-[0_0_30px_rgba(255,0,110,0.4)]',
    border: 'border-neon-pink',
    badge: 'bg-neon-pink',
  },
}

export function CarCard({ car, selectable, selected, onSelect, showDetails = true }: CarCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { displayMode, showCollectorDetails } = useStore()
  const { isNostalgic } = useMode()

  const showCollectorInfo = displayMode === 'collector' || displayMode === 'balanced'
  const showPopCultureInfo = displayMode === 'pop_culture' || displayMode === 'balanced'

  const rarity = (car.rarity || 'common') as keyof typeof rarityConfig
  const config = rarityConfig[rarity]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'relative rounded-xl overflow-hidden cursor-pointer',
          'bg-gradient-to-br from-[#0A0E27] to-[#1e293b]',
          'border-2 transition-all duration-300',
          selected ? 'border-neon-pink shadow-[0_0_30px_rgba(255,0,110,0.5)]' : config.border,
          isHovered && config.glow
        )}
        onClick={() => selectable ? onSelect?.(car) : setShowModal(true)}
      >
        {/* Background Gradient */}
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30', config.gradient)} />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Image Section */}
        <div className="relative h-44 overflow-hidden">
          {car.imageUrl ? (
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={car.imageUrl}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-slate-800/50 flex items-center justify-center">
              <CarIcon size={64} className="text-slate-600" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />

          {/* Selection Indicator */}
          {selectable && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center',
                selected
                  ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,110,0.6)]'
                  : 'bg-black/60 text-slate-400 backdrop-blur-sm'
              )}
            >
              {selected ? <Check size={18} /> : <Plus size={18} />}
            </motion.div>
          )}

          {/* Rarity Badge */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-3 left-3"
          >
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider',
              config.badge,
              'text-white shadow-lg'
            )}>
              {rarity}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-4 z-10">
          {/* Title */}
          <h3 className="font-orbitron font-bold text-white text-lg mb-1 tracking-wide">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-slate-400 mb-3 font-rajdhani">
            {car.year} {car.trim && `• ${car.trim}`}
          </p>

          {/* Mode-specific content */}
          {isNostalgic ? (
            // Nostalgic Mode - Show Pop Culture & Fun Stats
            <div className="space-y-3">
              {car.movieAppearances && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-2 bg-neon-pink/10 rounded-lg border border-neon-pink/30"
                >
                  <p className="text-[10px] text-neon-pink font-bold flex items-center gap-1 uppercase tracking-wider">
                    <Award size={10} />
                    Featured In
                  </p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {car.movieAppearances}
                  </p>
                </motion.div>
              )}

              {/* Power Bar */}
              {car.horsepower && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap size={10} className="text-neon-yellow" />
                      Power
                    </span>
                    <span className="text-neon-green font-bold">{car.horsepower} HP</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((car.horsepower / 800) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full"
                      style={{ boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)' }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Serious Mode - Show Technical Specs
            <div className="grid grid-cols-2 gap-2 text-xs">
              {car.year && (
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-slate-500 block">Year</span>
                  <span className="text-white font-medium">{car.year}</span>
                </div>
              )}
              {car.horsepower && (
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-slate-500 block">Horsepower</span>
                  <span className="text-white font-medium">{car.horsepower} hp</span>
                </div>
              )}
              {car.engineType && (
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-slate-500 block">Engine</span>
                  <span className="text-white font-medium text-[10px]">{car.engineType}</span>
                </div>
              )}
              {car.currentValue && showCollectorInfo && (
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-slate-500 block">Value</span>
                  <span className="text-neon-green font-medium">{formatCurrency(car.currentValue)}</span>
                </div>
              )}
            </div>
          )}

          {/* View Details Button */}
          {showDetails && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-300 text-sm font-medium
                         hover:border-neon-blue hover:text-neon-blue transition-all duration-300
                         flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
            >
              <Info size={14} />
              Deep Dive
            </motion.button>
          )}
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: rarity === 'legendary'
              ? 'radial-gradient(circle at center, rgba(255,0,110,0.1) 0%, transparent 70%)'
              : rarity === 'rare'
              ? 'radial-gradient(circle at center, rgba(0,240,255,0.1) 0%, transparent 70%)'
              : 'none'
          }}
        />
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`${car.year} ${car.make} ${car.model}`}
        size="xl"
      >
        <CarDetailView car={car} />
      </Modal>
    </>
  )
}

function CarDetailView({ car }: { car: CarType }) {
  const { displayMode, showCollectorDetails } = useStore()

  return (
    <div className="space-y-6">
      {/* Image */}
      {car.imageUrl && (
        <div className="relative h-64 rounded-xl overflow-hidden">
          <Image
            src={car.imageUrl}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Specs Grid */}
      <div>
        <h4 className="text-lg font-bold text-white mb-3">Specifications</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {car.engineType && (
            <SpecItem label="Engine" value={car.engineType} />
          )}
          {car.horsepower && (
            <SpecItem label="Horsepower" value={`${car.horsepower} hp`} />
          )}
          {car.torque && (
            <SpecItem label="Torque" value={`${car.torque} lb-ft`} />
          )}
          {car.transmission && (
            <SpecItem label="Transmission" value={car.transmission} />
          )}
          {car.drivetrain && (
            <SpecItem label="Drivetrain" value={car.drivetrain} />
          )}
          {car.zeroToSixty && (
            <SpecItem label="0-60 mph" value={`${car.zeroToSixty}s`} />
          )}
          {car.topSpeed && (
            <SpecItem label="Top Speed" value={`${car.topSpeed} mph`} />
          )}
          {car.weight && (
            <SpecItem label="Weight" value={`${car.weight} lbs`} />
          )}
        </div>
      </div>

      {/* Pop Culture */}
      {(car.movieAppearances || car.famousOwners) && (
        <div>
          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Award className="text-neon-pink" size={20} />
            Pop Culture
          </h4>
          <div className="space-y-3">
            {car.movieAppearances && (
              <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/20">
                <p className="text-xs text-neon-pink font-medium mb-1">Movie Appearances</p>
                <p className="text-gray-300">{car.movieAppearances}</p>
              </div>
            )}
            {car.famousOwners && (
              <div className="p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
                <p className="text-xs text-neon-blue font-medium mb-1">Famous Owners</p>
                <p className="text-gray-300">{car.famousOwners}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collector Info */}
      {showCollectorDetails && (
        <div>
          <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <History className="text-neon-green" size={20} />
            Collector Data
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {car.msrp && (
              <SpecItem label="Original MSRP" value={formatCurrency(car.msrp)} />
            )}
            {car.currentValue && (
              <SpecItem label="Current Value" value={formatCurrency(car.currentValue)} highlight />
            )}
            {car.productionCount && (
              <SpecItem label="Production" value={`${car.productionCount} units`} />
            )}
            {car.rarity && (
              <SpecItem label="Rarity" value={car.rarity} className={getRarityColor(car.rarity)} />
            )}
          </div>

          {/* Auction History */}
          {car.auctionHistory && car.auctionHistory.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400 mb-2">Recent Auction Results</p>
              <div className="space-y-2">
                {car.auctionHistory.map((auction, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-retro-purple/20 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{auction.house}</p>
                      <p className="text-xs text-gray-400">{auction.date} • {auction.condition}</p>
                    </div>
                    <p className="text-neon-green font-bold">{formatCurrency(auction.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provenance */}
          {car.provenance && car.provenance.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400 mb-2">Ownership History</p>
              <div className="relative pl-4 border-l-2 border-retro-purple/50 space-y-4">
                {car.provenance.map((record, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.3rem] w-3 h-3 bg-neon-pink rounded-full" />
                    <p className="text-white font-medium">{record.owner}</p>
                    <p className="text-xs text-gray-400">{record.period}</p>
                    {record.location && (
                      <p className="text-xs text-gray-500">{record.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SpecItem({
  label,
  value,
  highlight,
  className,
}: {
  label: string
  value: string
  highlight?: boolean
  className?: string
}) {
  return (
    <div className="p-3 bg-retro-purple/20 rounded-lg">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={cn('font-medium', highlight ? 'text-neon-green' : 'text-white', className)}>
        {value}
      </p>
    </div>
  )
}

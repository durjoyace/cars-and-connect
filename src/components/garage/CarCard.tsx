'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Info, Plus, Check, History, Award, ExternalLink } from 'lucide-react'
import { Card, Badge, Button, Modal } from '@/components/ui'
import { cn, formatCurrency, getRarityColor } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import type { Car } from '@/types'

interface CarCardProps {
  car: Car
  selectable?: boolean
  selected?: boolean
  onSelect?: (car: Car) => void
  showDetails?: boolean
}

export function CarCard({ car, selectable, selected, onSelect, showDetails = true }: CarCardProps) {
  const [showModal, setShowModal] = useState(false)
  const { displayMode, showCollectorDetails } = useStore()

  const showCollectorInfo = displayMode === 'collector' || displayMode === 'balanced'
  const showPopCultureInfo = displayMode === 'pop_culture' || displayMode === 'balanced'

  return (
    <>
      <Card
        variant={selected ? 'neon' : 'garage'}
        hover={selectable}
        className={cn('group', selectable && 'cursor-pointer')}
        onClick={() => selectable && onSelect?.(car)}
      >
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-retro-purple/30 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent" />

          {/* Selection Indicator */}
          {selectable && (
            <div className={cn(
              'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              selected
                ? 'bg-neon-pink text-white'
                : 'bg-black/50 text-gray-400 group-hover:bg-white/20'
            )}>
              {selected ? <Check size={18} /> : <Plus size={18} />}
            </div>
          )}

          {/* Rarity Badge */}
          {car.rarity && (
            <div className="absolute top-3 left-3">
              <Badge variant={car.rarity as any} size="sm">
                {car.rarity}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-white text-lg mb-1">
            {car.year} {car.make} {car.model}
          </h3>
          {car.trim && (
            <p className="text-sm text-gray-400 mb-3">{car.trim}</p>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            {car.horsepower && (
              <div>
                <span className="text-gray-500">Power</span>
                <p className="text-white font-medium">{car.horsepower} hp</p>
              </div>
            )}
            {car.currentValue && showCollectorInfo && (
              <div>
                <span className="text-gray-500">Value</span>
                <p className="text-neon-green font-medium">{formatCurrency(car.currentValue)}</p>
              </div>
            )}
          </div>

          {/* Pop Culture Info */}
          {showPopCultureInfo && car.movieAppearances && (
            <div className="mb-3 p-2 bg-neon-pink/10 rounded-lg border border-neon-pink/20">
              <p className="text-xs text-neon-pink font-medium flex items-center gap-1">
                <Award size={12} />
                Featured In
              </p>
              <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                {car.movieAppearances}
              </p>
            </div>
          )}

          {/* Action */}
          {showDetails && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
              }}
            >
              <Info size={16} className="mr-2" />
              Deep Dive
            </Button>
          )}
        </div>
      </Card>

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

function CarDetailView({ car }: { car: Car }) {
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

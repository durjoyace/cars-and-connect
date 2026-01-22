'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Car, Settings, Grid, List, Sparkles, DollarSign, ChevronRight } from 'lucide-react'
import { Card, Button, Badge, Modal } from '@/components/ui'
import { CarCard } from '@/components/garage/CarCard'
import { GarageBuilder } from '@/components/garage/GarageBuilder'
import { useMode } from '@/context/ModeContext'
import { formatCurrency } from '@/lib/utils'
import type { Car as CarType, Garage } from '@/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function GaragePage() {
  const [garages, setGarages] = useState<Garage[]>([])
  const [cars, setCars] = useState<CarType[]>([])
  const [showBuilder, setShowBuilder] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isNostalgic } = useMode()

  useEffect(() => {
    Promise.all([
      fetch('/api/garages').then((r) => r.json()),
      fetch('/api/cars').then((r) => r.json()),
    ])
      .then(([garagesData, carsData]) => {
        setGarages(garagesData)
        setCars(carsData)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreateGarage = async (selectedCars: CarType[], title: string, description: string) => {
    try {
      const res = await fetch('/api/garages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,
          description,
          carIds: selectedCars.map((c) => c.id),
        }),
      })

      if (res.ok) {
        const newGarage = await res.json()
        setGarages([newGarage, ...garages])
        setShowBuilder(false)
      }
    } catch (error) {
      console.error('Failed to create garage:', error)
    }
  }

  const totalCollectionValue = cars.reduce((sum, car) => sum + (car.currentValue || car.msrp || 0), 0)

  if (showBuilder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Build Your Garage</h1>
            <p className="text-slate-400">Select cars to add to your collection</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBuilder(false)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </motion.button>
        </div>
        <GarageBuilder cars={cars} onSubmit={handleCreateGarage} />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Hero Header */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-green/30 p-6 md:p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-4 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-xl border border-neon-green/30"
              >
                <Car className="w-10 h-10 text-neon-green" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white">
                  {isNostalgic ? (
                    <span className="bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                      MY GARAGE
                    </span>
                  ) : (
                    'My Garage'
                  )}
                </h1>
                <p className="text-slate-400">Your personal car collections</p>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Collection Value */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-4 py-3 bg-neon-green/10 border border-neon-green/30 rounded-xl"
              >
                <DollarSign size={20} className="text-neon-green" />
                <div>
                  <p className="text-xs text-slate-400">Collection Value</p>
                  <p className="text-lg font-orbitron font-bold text-neon-green">
                    {formatCurrency(totalCollectionValue)}
                  </p>
                </div>
              </motion.div>

              {/* View Toggle */}
              <div className="flex gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-neon-pink text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-neon-pink text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* New Garage Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBuilder(true)}
                className="btn-neon px-5 py-3 font-orbitron flex items-center gap-2"
              >
                <Plus size={20} />
                New Garage
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Garages */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-64 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
            />
          ))}
        </div>
      ) : garages.length > 0 ? (
        <motion.div variants={containerVariants} className="space-y-8 mb-12">
          {garages.map((garage, index) => (
            <motion.div
              key={garage.id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <GarageSection garage={garage} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="mb-12">
          <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-12 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Car className="w-20 h-20 text-slate-600 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-2xl font-orbitron font-bold text-white mb-3">No Garages Yet</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Start building your dream collection by creating your first garage. Pick your favorite rides!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBuilder(true)}
              className="btn-neon px-8 py-4 font-orbitron text-lg flex items-center gap-3 mx-auto"
            >
              <Sparkles size={24} />
              Create Your First Garage
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Car Library */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-blue/20 rounded-lg">
              <Car className="text-neon-blue" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">Car Library</h2>
              <p className="text-sm text-slate-400">Browse {cars.length} available cars</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-neon-blue transition-colors"
          >
            View All <ChevronRight size={16} />
          </motion.button>
        </div>

        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'space-y-4'
        }>
          {cars.slice(0, 8).map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        {cars.length > 8 && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-neon-blue/50 transition-all"
            >
              View All {cars.length} Cars
            </motion.button>
          </div>
        )}
      </motion.section>
    </motion.div>
  )
}

function GarageSection({ garage }: { garage: Garage }) {
  const totalValue = garage.entries?.reduce(
    (sum, entry) => sum + (entry.car?.currentValue || entry.car?.msrp || 0),
    0
  ) || 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-6 hover:border-neon-pink/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="p-3 bg-neon-pink/20 rounded-xl border border-neon-pink/30"
          >
            <Car className="text-neon-pink" size={24} />
          </motion.div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-orbitron font-bold text-white">{garage.name}</h3>
              {garage.theme && (
                <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs font-bold rounded-full border border-neon-purple/30">
                  {garage.theme.replace('_', ' ')}
                </span>
              )}
            </div>
            {garage.description && (
              <p className="text-slate-400 text-sm">{garage.description}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Total Value</p>
          <p className="text-2xl font-orbitron font-bold text-neon-green">{formatCurrency(totalValue)}</p>
        </div>
      </div>

      {garage.entries && garage.entries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {garage.entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="aspect-video bg-slate-800/50 rounded-xl overflow-hidden relative group border border-slate-700/50 hover:border-neon-blue/50 transition-all cursor-pointer"
            >
              {entry.car?.imageUrl && (
                <img
                  src={entry.car.imageUrl}
                  alt={`${entry.car.year} ${entry.car.make} ${entry.car.model}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div>
                  <p className="text-white text-sm font-medium truncate">
                    {entry.car?.year} {entry.car?.make}
                  </p>
                  <p className="text-neon-blue text-xs font-bold">{entry.car?.model}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-slate-700/50 rounded-xl">
          <p className="text-slate-500">No cars in this garage yet</p>
        </div>
      )}
    </motion.div>
  )
}

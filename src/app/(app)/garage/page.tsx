'use client'

import { useState, useEffect } from 'react'
import { Plus, Car, Settings } from 'lucide-react'
import { Card, Button, Badge, Modal } from '@/components/ui'
import { CarCard } from '@/components/garage/CarCard'
import { GarageBuilder } from '@/components/garage/GarageBuilder'
import { formatCurrency } from '@/lib/utils'
import type { Car as CarType, Garage } from '@/types'

export default function GaragePage() {
  const [garages, setGarages] = useState<Garage[]>([])
  const [cars, setCars] = useState<CarType[]>([])
  const [showBuilder, setShowBuilder] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  if (showBuilder) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Build Your Garage</h1>
            <p className="text-gray-400">Select cars to add to your collection</p>
          </div>
          <Button variant="ghost" onClick={() => setShowBuilder(false)}>
            Cancel
          </Button>
        </div>
        <GarageBuilder cars={cars} onSubmit={handleCreateGarage} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Garage</h1>
          <p className="text-gray-400">Your personal car collections</p>
        </div>
        <Button variant="neon" onClick={() => setShowBuilder(true)}>
          <Plus size={20} className="mr-2" />
          New Garage
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-64 animate-pulse bg-retro-purple/20" />
          ))}
        </div>
      ) : garages.length > 0 ? (
        <div className="space-y-8">
          {garages.map((garage) => (
            <GarageSection key={garage.id} garage={garage} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Garages Yet</h3>
          <p className="text-gray-400 mb-6">
            Start building your dream collection by creating your first garage
          </p>
          <Button variant="neon" onClick={() => setShowBuilder(true)}>
            <Plus size={20} className="mr-2" />
            Create Your First Garage
          </Button>
        </Card>
      )}

      {/* Car Library */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white mb-4">Car Library</h2>
        <p className="text-gray-400 mb-6">Browse available cars to add to your garages</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.slice(0, 8).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {cars.length > 8 && (
          <div className="text-center mt-6">
            <Button variant="secondary">View All {cars.length} Cars</Button>
          </div>
        )}
      </section>
    </div>
  )
}

function GarageSection({ garage }: { garage: Garage }) {
  const totalValue = garage.entries?.reduce(
    (sum, entry) => sum + (entry.car?.currentValue || entry.car?.msrp || 0),
    0
  ) || 0

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white">{garage.name}</h3>
            {garage.theme && (
              <Badge variant="default" size="sm">
                {garage.theme.replace('_', ' ')}
              </Badge>
            )}
          </div>
          {garage.description && (
            <p className="text-gray-400 text-sm">{garage.description}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-xl font-bold text-neon-green">{formatCurrency(totalValue)}</p>
        </div>
      </div>

      {garage.entries && garage.entries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {garage.entries.map((entry) => (
            <div
              key={entry.id}
              className="aspect-video bg-retro-purple/30 rounded-lg overflow-hidden relative group"
            >
              {entry.car?.imageUrl && (
                <img
                  src={entry.car.imageUrl}
                  alt={`${entry.car.year} ${entry.car.make} ${entry.car.model}`}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs font-medium truncate">
                  {entry.car?.year} {entry.car?.make} {entry.car?.model}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No cars in this garage yet</p>
      )}
    </Card>
  )
}

'use client'

import { useState } from 'react'
import { Search, Filter, X, DollarSign, Calendar, Check } from 'lucide-react'
import { Card, Button, Input, Badge } from '@/components/ui'
import { CarCard } from './CarCard'
import { useStore } from '@/store/useStore'
import { formatCurrency } from '@/lib/utils'
import type { Car, Challenge } from '@/types'

interface GarageBuilderProps {
  cars: Car[]
  challenge?: Challenge
  onSubmit: (garage: Car[], title: string, description: string) => void
}

export function GarageBuilder({ cars, challenge, onSubmit }: GarageBuilderProps) {
  const { buildingGarage, addCarToGarage, removeCarFromGarage, clearBuildingGarage } = useStore()
  const [search, setSearch] = useState('')
  const [filterEra, setFilterEra] = useState<string>('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [step, setStep] = useState<'select' | 'review'>('select')

  const totalValue = buildingGarage.reduce((sum, car) => sum + (car.currentValue || car.msrp || 0), 0)
  const isOverBudget = challenge?.budgetLimit && totalValue > challenge.budgetLimit

  const filteredCars = cars.filter((car) => {
    const matchesSearch = search === '' ||
      `${car.year} ${car.make} ${car.model} ${car.trim || ''}`.toLowerCase().includes(search.toLowerCase())

    const matchesEra = filterEra === '' ||
      (filterEra === '60s' && car.year >= 1960 && car.year < 1970) ||
      (filterEra === '70s' && car.year >= 1970 && car.year < 1980) ||
      (filterEra === '80s' && car.year >= 1980 && car.year < 1990) ||
      (filterEra === '90s' && car.year >= 1990 && car.year < 2000) ||
      (filterEra === '2000s' && car.year >= 2000)

    return matchesSearch && matchesEra
  })

  const handleCarToggle = (car: Car) => {
    const isSelected = buildingGarage.some((c) => c.id === car.id)
    if (isSelected) {
      removeCarFromGarage(car.id)
    } else {
      addCarToGarage(car)
    }
  }

  const handleSubmit = () => {
    if (buildingGarage.length === 0) return
    onSubmit(buildingGarage, title, description)
    clearBuildingGarage()
    setTitle('')
    setDescription('')
    setStep('select')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Car Selection */}
      <div className="flex-1">
        {step === 'select' ? (
          <>
            {/* Filters */}
            <Card className="p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search cars..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search size={18} />}
                  />
                </div>
                <div className="flex gap-2">
                  {['60s', '70s', '80s', '90s', '2000s'].map((era) => (
                    <button
                      key={era}
                      onClick={() => setFilterEra(filterEra === era ? '' : era)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterEra === era
                          ? 'bg-neon-pink text-white'
                          : 'bg-retro-purple/30 text-gray-400 hover:text-white'
                      }`}
                    >
                      {era}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  selectable
                  selected={buildingGarage.some((c) => c.id === car.id)}
                  onSelect={handleCarToggle}
                  showDetails={false}
                />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No cars match your search criteria
              </div>
            )}
          </>
        ) : (
          /* Review Step */
          <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Review Your Garage</h3>

            <div className="space-y-4 mb-6">
              <Input
                label="Garage Name"
                placeholder="e.g., My JDM Dream Team"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  placeholder="Tell us why you chose these cars..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-retro-dark border border-retro-purple/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 min-h-[100px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {buildingGarage.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-3 p-3 bg-retro-purple/20 rounded-lg"
                >
                  <div className="w-16 h-12 bg-retro-purple/50 rounded overflow-hidden">
                    {car.imageUrl && (
                      <img
                        src={car.imageUrl}
                        alt={car.make}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {car.year} {car.make} {car.model}
                    </p>
                    <p className="text-sm text-neon-green">
                      {formatCurrency(car.currentValue || car.msrp || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep('select')} className="flex-1">
                Back to Selection
              </Button>
              <Button
                variant="neon"
                onClick={handleSubmit}
                disabled={!title || !!isOverBudget}
                className="flex-1"
              >
                <Check size={18} className="mr-2" />
                Submit Garage
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Selection Summary */}
      <div className="lg:w-80">
        <div className="sticky top-24">
          <Card className="p-4">
            <h3 className="font-bold text-white mb-4">Your Selection</h3>

            {/* Budget Indicator */}
            {challenge?.budgetLimit && (
              <div className="mb-4 p-3 bg-retro-purple/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <DollarSign size={14} />
                    Budget
                  </span>
                  <span className={`font-bold ${isOverBudget ? 'text-red-400' : 'text-neon-green'}`}>
                    {formatCurrency(totalValue)} / {formatCurrency(challenge.budgetLimit)}
                  </span>
                </div>
                <div className="h-2 bg-retro-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOverBudget ? 'bg-red-500' : 'bg-neon-green'}`}
                    style={{
                      width: `${Math.min((totalValue / challenge.budgetLimit) * 100, 100)}%`,
                    }}
                  />
                </div>
                {isOverBudget && (
                  <p className="text-xs text-red-400 mt-2">Over budget!</p>
                )}
              </div>
            )}

            {/* Selected Cars */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {buildingGarage.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No cars selected yet
                </p>
              ) : (
                buildingGarage.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center justify-between p-2 bg-retro-purple/20 rounded-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white truncate">
                        {car.year} {car.make} {car.model}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatCurrency(car.currentValue || car.msrp || 0)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeCarFromGarage(car.id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="border-t border-retro-purple/30 pt-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Cars Selected</span>
                <span className="text-white font-medium">{buildingGarage.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Value</span>
                <span className="text-neon-green font-bold">{formatCurrency(totalValue)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                variant="neon"
                className="w-full"
                disabled={buildingGarage.length === 0 || isOverBudget}
                onClick={() => setStep('review')}
              >
                Continue to Review
              </Button>
              {buildingGarage.length > 0 && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={clearBuildingGarage}
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

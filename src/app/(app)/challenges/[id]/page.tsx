'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy, Clock, Users, ArrowLeft, Zap, Target, DollarSign,
  Calendar, ChevronRight, Plus, Check, Car, Sparkles
} from 'lucide-react'
import { Button, Badge, Card } from '@/components/ui'
import { CarCard } from '@/components/garage/CarCard'
import { useMode } from '@/context/ModeContext'
import { formatCurrency, getThemeEmoji, getDifficultyColor } from '@/lib/utils'
import type { Challenge, Car as CarType } from '@/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ChallengeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [cars, setCars] = useState<CarType[]>([])
  const [selectedCars, setSelectedCars] = useState<CarType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState('')
  const { isNostalgic } = useMode()

  useEffect(() => {
    Promise.all([
      fetch(`/api/challenges/${params.id}`).then((r) => r.json()),
      fetch('/api/cars').then((r) => r.json()),
    ])
      .then(([challengeData, carsData]) => {
        setChallenge(challengeData)
        setCars(carsData)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [params.id])

  useEffect(() => {
    if (!challenge) return

    const updateCountdown = () => {
      const now = new Date()
      const end = new Date(challenge.endsAt)
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setCountdown('Challenge Ended')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${minutes}m`)
      } else {
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [challenge])

  const handleCarSelect = (car: CarType) => {
    setSelectedCars((prev) => {
      const isSelected = prev.some((c) => c.id === car.id)
      if (isSelected) {
        return prev.filter((c) => c.id !== car.id)
      }
      if (prev.length >= 5) {
        return prev
      }
      return [...prev, car]
    })
  }

  const handleSubmit = async () => {
    if (selectedCars.length === 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge?.id,
          carIds: selectedCars.map((c) => c.id),
        }),
      })

      if (res.ok) {
        router.push('/challenges?submitted=true')
      }
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalValue = selectedCars.reduce((sum, car) => sum + (car.currentValue || car.msrp || 0), 0)
  const isOverBudget = challenge?.budgetLimit && totalValue > challenge.budgetLimit
  const isInEra = (car: CarType) => {
    if (!challenge?.eraStart || !challenge?.eraEnd) return true
    return car.year >= challenge.eraStart && car.year <= challenge.eraEnd
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-neon-pink border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="text-center py-20">
        <Trophy size={64} className="text-slate-600 mx-auto mb-4" />
        <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Challenge Not Found</h2>
        <p className="text-slate-400 mb-8">This challenge may have been removed or doesn't exist.</p>
        <Link href="/challenges">
          <Button variant="neon">Back to Challenges</Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="mb-6">
        <Link href="/challenges">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Challenges
          </motion.button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A0E27] via-[#1e293b] to-[#0A0E27] border border-neon-pink/30">
          {/* Background Image */}
          {challenge.imageUrl && (
            <div className="absolute inset-0">
              <Image
                src={challenge.imageUrl}
                alt={challenge.title}
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0A0E27]/80 to-transparent" />
            </div>
          )}

          <div className="relative p-6 md:p-8 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Side - Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="neon" size="sm">
                    {getThemeEmoji(challenge.theme)} {challenge.theme.replace('_', ' ')}
                  </Badge>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.toUpperCase()}
                  </span>
                  {challenge.isActive && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-neon-green/20 border border-neon-green/30 rounded-full text-xs font-bold text-neon-green">
                      <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white mb-3">
                  {isNostalgic ? (
                    <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                      {challenge.title}
                    </span>
                  ) : (
                    challenge.title
                  )}
                </h1>

                <p className="text-lg text-slate-300 mb-6 max-w-2xl">
                  {challenge.description}
                </p>

                {/* Challenge Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <Trophy size={18} className="text-yellow-400" />
                    <span className="font-bold text-yellow-400">{challenge.points} points</span>
                  </div>
                  {challenge.budgetLimit && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-xl">
                      <DollarSign size={18} className="text-neon-green" />
                      <span className="font-bold text-neon-green">{formatCurrency(challenge.budgetLimit)} budget</span>
                    </div>
                  )}
                  {challenge.eraStart && challenge.eraEnd && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-xl">
                      <Calendar size={18} className="text-neon-blue" />
                      <span className="font-bold text-neon-blue">{challenge.eraStart} - {challenge.eraEnd}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Timer */}
              <div className="flex flex-col items-center lg:items-end gap-4">
                <div className="text-center lg:text-right">
                  <p className="text-xs text-slate-400 mb-1 flex items-center gap-1 justify-center lg:justify-end">
                    <Clock size={12} />
                    Time Remaining
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-mono text-4xl font-bold text-white tracking-wider"
                  >
                    {countdown}
                  </motion.div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Users size={16} />
                  <span>142 submissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Build Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Selection */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-orbitron font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-neon-blue/20 rounded-lg">
                <Car className="text-neon-blue" size={20} />
              </div>
              Select Your Cars
            </h2>
            <span className="text-sm text-slate-400">
              {selectedCars.length}/5 selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cars.map((car, index) => {
              const inEra = isInEra(car)
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={!inEra ? 'opacity-50' : ''}
                >
                  <CarCard
                    car={car}
                    selectable
                    selected={selectedCars.some((c) => c.id === car.id)}
                    onSelect={inEra ? handleCarSelect : undefined}
                    showDetails={false}
                  />
                  {!inEra && (
                    <p className="text-xs text-red-400 text-center mt-2">
                      Outside era range
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Submission Panel */}
        <motion.div variants={itemVariants}>
          <div className="sticky top-24">
            <div className="rounded-xl bg-gradient-to-br from-[#0A0E27] to-[#1e293b] border border-slate-700/50 p-6">
              <h3 className="text-lg font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                <Target className="text-neon-pink" size={20} />
                Your Submission
              </h3>

              {/* Selected Cars */}
              {selectedCars.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {selectedCars.map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                    >
                      {car.imageUrl && (
                        <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={car.imageUrl}
                            alt={car.model}
                            width={64}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {car.year} {car.make} {car.model}
                        </p>
                        <p className="text-xs text-neon-green">
                          {formatCurrency(car.currentValue || car.msrp || 0)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCarSelect(car)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Plus size={18} className="rotate-45" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6 border border-dashed border-slate-700/50 rounded-xl">
                  <Sparkles size={32} className="text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Select cars to build your garage</p>
                </div>
              )}

              {/* Budget Info */}
              {challenge.budgetLimit && (
                <div className={`p-4 rounded-lg mb-6 ${isOverBudget ? 'bg-red-500/10 border border-red-500/30' : 'bg-neon-green/10 border border-neon-green/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Total Value</span>
                    <span className={`font-bold ${isOverBudget ? 'text-red-400' : 'text-neon-green'}`}>
                      {formatCurrency(totalValue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Budget Limit</span>
                    <span className="font-bold text-white">{formatCurrency(challenge.budgetLimit)}</span>
                  </div>
                  {isOverBudget && (
                    <p className="text-xs text-red-400 mt-2">Over budget by {formatCurrency(totalValue - challenge.budgetLimit)}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={selectedCars.length === 0 || isOverBudget || isSubmitting}
                className={`w-full py-4 rounded-xl font-orbitron font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  selectedCars.length === 0 || isOverBudget
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'btn-neon'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Submit Entry
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Users, Gift, Share2, Mail } from 'lucide-react'
import { Card, Button, Badge, Progress } from '@/components/ui'
import { unlockableItems } from '@/data/unlockables'

interface Invite {
  id: string
  code: string
  status: string
  createdAt: string
  receiver?: {
    name: string
    image: string
  }
}

export default function InvitePage() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [currentCode, setCurrentCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch('/api/invites')
      .then((r) => r.json())
      .then(setInvites)
      .catch(console.error)
  }, [])

  const generateInvite = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/invites', { method: 'POST' })
      const invite = await res.json()
      setCurrentCode(invite.code)
      setInvites([invite, ...invites])
    } catch (error) {
      console.error('Failed to generate invite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (currentCode) {
      navigator.clipboard.writeText(`Join me on Cars & Connection! Use my invite code: ${currentCode}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const acceptedCount = invites.filter((i) => i.status === 'accepted').length

  // Get unlock milestones
  const inviteUnlocks = unlockableItems
    .filter((item) => item.requirement.startsWith('invites_'))
    .sort((a, b) => a.requiredCount - b.requiredCount)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invite Friends</h1>
        <p className="text-gray-400">Grow your crew and unlock exclusive features together</p>
      </div>

      {/* Progress Card */}
      <Card variant="neon" className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-neon-pink/20 rounded-xl">
            <Users className="w-8 h-8 text-neon-pink" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Your Crew</h2>
            <p className="text-gray-400">{acceptedCount} friends have joined</p>
          </div>
        </div>

        {/* Unlock Progress */}
        <div className="space-y-4">
          {inviteUnlocks.map((unlock) => {
            const progress = Math.min(acceptedCount / unlock.requiredCount, 1)
            const isUnlocked = acceptedCount >= unlock.requiredCount

            return (
              <div key={unlock.name} className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isUnlocked ? 'bg-neon-green/20' : 'bg-retro-purple/30'
                  }`}
                >
                  {isUnlocked ? (
                    <Check className="w-6 h-6 text-neon-green" />
                  ) : (
                    <Gift className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-medium ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                      {unlock.name}
                    </p>
                    <Badge variant={isUnlocked ? 'success' : 'default'} size="sm">
                      {acceptedCount}/{unlock.requiredCount}
                    </Badge>
                  </div>
                  <Progress value={progress * 100} variant={isUnlocked ? 'default' : 'neon'} size="sm" />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Generate Invite */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Share Your Invite Code</h3>

        {currentCode ? (
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-retro-dark border border-retro-purple/50 rounded-lg p-4">
              <p className="text-2xl font-mono font-bold text-neon-pink tracking-widest text-center">
                {currentCode}
              </p>
            </div>
            <Button variant={copied ? 'secondary' : 'neon'} onClick={copyToClipboard}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </Button>
          </div>
        ) : (
          <Button
            variant="neon"
            className="w-full mb-4"
            onClick={generateInvite}
            isLoading={isLoading}
          >
            Generate Invite Code
          </Button>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={copyToClipboard} disabled={!currentCode}>
            <Share2 size={18} className="mr-2" />
            Share Link
          </Button>
          <Button variant="secondary" className="flex-1" disabled={!currentCode}>
            <Mail size={18} className="mr-2" />
            Send Email
          </Button>
        </div>
      </Card>

      {/* Invite History */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Invite History</h3>

        {invites.length > 0 ? (
          <div className="space-y-3">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-3 bg-retro-purple/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {invite.receiver ? (
                    <>
                      <div className="w-10 h-10 bg-retro-purple rounded-full flex items-center justify-center text-white font-bold">
                        {invite.receiver.name?.[0] || '?'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{invite.receiver.name}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(invite.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-retro-purple/50 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-mono text-gray-400">{invite.code}</p>
                        <p className="text-xs text-gray-500">
                          Created {new Date(invite.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <Badge
                  variant={invite.status === 'accepted' ? 'success' : 'default'}
                  size="sm"
                >
                  {invite.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No invites sent yet. Generate a code to get started!
          </p>
        )}
      </Card>
    </div>
  )
}

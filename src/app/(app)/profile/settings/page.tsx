'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Eye, Palette, Bell, Shield } from 'lucide-react'
import { Card, Button, Input, Toggle } from '@/components/ui'
import { useStore } from '@/store/useStore'

export default function SettingsPage() {
  const { data: session } = useSession()
  const { displayMode, setDisplayMode, showNeonEffects, toggleNeonEffects, showCollectorDetails, toggleCollectorDetails } = useStore()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your Cars & Connection experience</p>
      </div>

      {/* Display Preferences */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Eye size={20} className="text-neon-pink" />
          Display Preferences
        </h2>

        <div className="space-y-6">
          {/* Display Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Content Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pop_culture', label: 'Pop Culture', desc: 'Movie references, stickers, themes' },
                { id: 'balanced', label: 'Balanced', desc: 'Best of both worlds' },
                { id: 'collector', label: 'Collector', desc: 'Data, provenance, auctions' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setDisplayMode(mode.id as any)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    displayMode === mode.id
                      ? 'bg-neon-pink/20 border-2 border-neon-pink'
                      : 'bg-retro-purple/20 border-2 border-transparent hover:border-retro-purple/50'
                  }`}
                >
                  <p className={`font-medium ${displayMode === mode.id ? 'text-neon-pink' : 'text-white'}`}>
                    {mode.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4 pt-4 border-t border-retro-purple/30">
            <Toggle
              checked={showNeonEffects}
              onChange={toggleNeonEffects}
              label="Neon Effects"
              description="Enable glowing animations and neon styling"
              variant="neon"
            />
            <Toggle
              checked={showCollectorDetails}
              onChange={toggleCollectorDetails}
              label="Collector Details"
              description="Show auction history, provenance, and values"
              variant="neon"
            />
          </div>
        </div>
      </Card>

      {/* Theme Preferences */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Palette size={20} className="text-neon-blue" />
          Theme
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Neon Night', colors: ['#ff00ff', '#00ffff'] },
            { name: 'Racing Red', colors: ['#ff0000', '#ff6600'] },
            { name: 'JDM Green', colors: ['#00ff00', '#00cc00'] },
            { name: 'Classic Chrome', colors: ['#c0c0c0', '#808080'] },
          ].map((theme) => (
            <button
              key={theme.name}
              className="p-3 rounded-xl bg-retro-purple/20 hover:bg-retro-purple/40 transition-colors"
            >
              <div
                className="h-8 rounded-lg mb-2"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                }}
              />
              <p className="text-xs text-gray-400">{theme.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bell size={20} className="text-yellow-400" />
          Notifications
        </h2>

        <div className="space-y-4">
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Daily Challenge Reminders"
            description="Get notified when new challenges drop"
          />
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Friend Activity"
            description="When friends react to your submissions"
          />
          <Toggle
            checked={false}
            onChange={() => {}}
            label="Marketing Emails"
            description="News and updates from Cars & Connection"
          />
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-green-400" />
          Privacy
        </h2>

        <div className="space-y-4">
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Public Profile"
            description="Allow others to see your garages and stats"
          />
          <Toggle
            checked={true}
            onChange={() => {}}
            label="Show on Leaderboards"
            description="Appear in challenge rankings"
          />
        </div>
      </Card>

      {/* Save Button */}
      <Button
        variant="neon"
        className="w-full"
        onClick={handleSave}
        isLoading={isSaving}
      >
        <Save size={18} className="mr-2" />
        Save Changes
      </Button>
    </div>
  )
}

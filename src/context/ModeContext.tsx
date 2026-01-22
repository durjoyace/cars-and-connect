'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AppMode = 'nostalgic' | 'serious'

interface ModeContextType {
  mode: AppMode
  toggleMode: () => void
  setMode: (mode: AppMode) => void
  isNostalgic: boolean
  isSerious: boolean
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>('nostalgic')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved preference from localStorage
    const savedMode = localStorage.getItem('app-mode') as AppMode
    if (savedMode === 'nostalgic' || savedMode === 'serious') {
      setModeState(savedMode)
    }
  }, [])

  const setMode = (newMode: AppMode) => {
    setModeState(newMode)
    localStorage.setItem('app-mode', newMode)
  }

  const toggleMode = () => {
    const newMode = mode === 'nostalgic' ? 'serious' : 'nostalgic'
    setMode(newMode)
  }

  const value: ModeContextType = {
    mode,
    toggleMode,
    setMode,
    isNostalgic: mode === 'nostalgic',
    isSerious: mode === 'serious',
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ModeContext.Provider value={{ ...value, mode: 'nostalgic', isNostalgic: true, isSerious: false }}>
        {children}
      </ModeContext.Provider>
    )
  }

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider')
  }
  return context
}

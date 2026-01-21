import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DisplayMode, Car, Challenge, Garage, Unlock } from '@/types'

interface AppState {
  // User preferences
  displayMode: DisplayMode
  setDisplayMode: (mode: DisplayMode) => void

  // Current session data
  currentChallenge: Challenge | null
  setCurrentChallenge: (challenge: Challenge | null) => void

  // Garage building
  buildingGarage: Car[]
  addCarToGarage: (car: Car) => void
  removeCarFromGarage: (carId: string) => void
  clearBuildingGarage: () => void

  // UI state
  showCollectorDetails: boolean
  toggleCollectorDetails: () => void
  showNeonEffects: boolean
  toggleNeonEffects: () => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

interface Notification {
  id: string
  type: 'unlock' | 'challenge' | 'invite' | 'reaction' | 'streak'
  title: string
  message: string
  imageUrl?: string
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // User preferences
      displayMode: 'balanced',
      setDisplayMode: (mode) => set({ displayMode: mode }),

      // Current session data
      currentChallenge: null,
      setCurrentChallenge: (challenge) => set({ currentChallenge: challenge }),

      // Garage building
      buildingGarage: [],
      addCarToGarage: (car) =>
        set((state) => ({
          buildingGarage: [...state.buildingGarage, car],
        })),
      removeCarFromGarage: (carId) =>
        set((state) => ({
          buildingGarage: state.buildingGarage.filter((c) => c.id !== carId),
        })),
      clearBuildingGarage: () => set({ buildingGarage: [] }),

      // UI state
      showCollectorDetails: true,
      toggleCollectorDetails: () =>
        set((state) => ({ showCollectorDetails: !state.showCollectorDetails })),
      showNeonEffects: true,
      toggleNeonEffects: () =>
        set((state) => ({ showNeonEffects: !state.showNeonEffects })),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: crypto.randomUUID() },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'cars-connection-store',
      partialize: (state) => ({
        displayMode: state.displayMode,
        showCollectorDetails: state.showCollectorDetails,
        showNeonEffects: state.showNeonEffects,
      }),
    }
  )
)

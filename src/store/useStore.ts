import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { DisplayMode, Car, Challenge, Garage, Unlock } from '@/types'

interface AppState {
  // Hydration state
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void

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

// Generate unique ID without crypto.randomUUID for compatibility
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Hydration state
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

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
            { ...notification, id: generateId() },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'cars-connection-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
      partialize: (state) => ({
        displayMode: state.displayMode,
        showCollectorDetails: state.showCollectorDetails,
        showNeonEffects: state.showNeonEffects,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

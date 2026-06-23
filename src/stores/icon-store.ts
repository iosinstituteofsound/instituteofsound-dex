import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const STORAGE_KEY = 'ios:dex:icon-anchor-v2'
const ICON = 56
const MARGIN = 16

interface IconAnchor {
  right: number
  bottom: number
}

interface IconState extends IconAnchor {
  setAnchor: (right: number, bottom: number) => void
  resetAnchor: () => void
}

function defaultAnchor(): IconAnchor {
  return { right: 24, bottom: 140 }
}

function clampAnchor(right: number, bottom: number): IconAnchor {
  if (typeof window === 'undefined') return { right, bottom }
  const maxRight = Math.max(MARGIN, window.innerWidth - ICON - MARGIN)
  const maxBottom = Math.max(MARGIN, window.innerHeight - ICON - MARGIN)
  return {
    right: Math.max(MARGIN, Math.min(right, maxRight)),
    bottom: Math.max(MARGIN, Math.min(bottom, maxBottom)),
  }
}

export const useIconStore = create<IconState>()(
  persist(
    (set) => ({
      ...defaultAnchor(),
      setAnchor: (right, bottom) => set(clampAnchor(right, bottom)),
      resetAnchor: () => set(defaultAnchor()),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({ right: s.right, bottom: s.bottom }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const clamped = clampAnchor(state.right, state.bottom)
        state.right = clamped.right
        state.bottom = clamped.bottom
      },
    },
  ),
)

export const DEX_ICON_SIZE = ICON

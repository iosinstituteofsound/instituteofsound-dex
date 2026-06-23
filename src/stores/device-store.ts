import { create } from 'zustand'
import type { DexBootPhase, DexModuleId } from '@dex/types'

interface DeviceState {
  isOpen: boolean
  bootPhase: DexBootPhase
  activeModule: DexModuleId | null
  initialized: boolean
  audioEnabled: boolean
  contextPulse: number
  open: () => void
  openForPlayback: (module?: DexModuleId) => void
  close: () => void
  toggle: () => void
  setBootPhase: (phase: DexBootPhase) => void
  setActiveModule: (module: DexModuleId | null) => void
  initialize: () => void
  resetBoot: () => void
  pulseContext: () => void
  setAudioEnabled: (enabled: boolean) => void
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
  isOpen: false,
  bootPhase: 'idle',
  activeModule: null,
  initialized: false,
  audioEnabled: false,
  contextPulse: 0,
  open: () => set({ isOpen: true, bootPhase: 'materialize', initialized: false, activeModule: null }),
  openForPlayback: (activeModule = 'now-playing') =>
    set({
      isOpen: true,
      bootPhase: 'ready',
      initialized: true,
      activeModule,
    }),
  close: () =>
    set({
      isOpen: false,
      bootPhase: 'idle',
      activeModule: null,
    }),
  toggle: () => {
    const { isOpen } = get()
    if (isOpen) get().close()
    else get().open()
  },
  setBootPhase: (bootPhase) => set({ bootPhase }),
  setActiveModule: (activeModule) => set({ activeModule }),
  initialize: () => set({ initialized: true, bootPhase: 'ready', activeModule: null }),
  resetBoot: () => set({ initialized: false, bootPhase: 'materialize', activeModule: null }),
  pulseContext: () => set((s) => ({ contextPulse: s.contextPulse + 1 })),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
}))

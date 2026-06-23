import { create } from 'zustand'
import type { DexContext } from '@dex/types'

interface ContextState extends DexContext {
  setContext: (ctx: DexContext) => void
  clearContext: () => void
}

const empty: DexContext = {}

export const useContextStore = create<ContextState>((set) => ({
  ...empty,
  setContext: (ctx) => set({ ...empty, ...ctx }),
  clearContext: () => set({ ...empty }),
}))

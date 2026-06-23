import { useCallback, useRef } from 'react'
import { useDeviceStore } from '@dex/stores/device-store'
import type { AudioPack } from '@dex/types'

export function useDexAudio(pack?: AudioPack) {
  const audioEnabled = useDeviceStore((s) => s.audioEnabled)
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map())

  const play = useCallback(
    (key: keyof AudioPack) => {
      if (!audioEnabled || !pack?.[key]) return
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      let audio = cache.current.get(key)
      if (!audio) {
        audio = new Audio(pack[key])
        cache.current.set(key, audio)
      }
      audio.currentTime = 0
      void audio.play().catch(() => undefined)
    },
    [audioEnabled, pack],
  )

  return { play, audioEnabled }
}

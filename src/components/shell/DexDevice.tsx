import { memo, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDeviceStore } from '@dex/stores/device-store'
import { useIconStore } from '@dex/stores/icon-store'
import { DeviceFrame } from '@dex/components/device/DeviceFrame'
import { DeviceScreen } from '@dex/components/device/DeviceScreen'
import { EnergyLines } from '@dex/components/device/EnergyLines'
import { ParticleLayer } from '@dex/three/ParticleLayer'

export const DexDevice = memo(function DexDevice() {
  const isOpen = useDeviceStore((s) => s.isOpen)
  const bootPhase = useDeviceStore((s) => s.bootPhase)
  const initialized = useDeviceStore((s) => s.initialized)
  const right = useIconStore((s) => s.right)
  const bottom = useIconStore((s) => s.bottom)
  const showFx = isOpen && !initialized

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') useDeviceStore.getState().close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 400
  const left = Math.max(16, viewportW - right - 380)

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="dex-interactive dex-device-anchor"
          style={{
            position: 'fixed',
            left,
            bottom: bottom + 72,
            zIndex: 99998,
          }}
        >
          <DeviceFrame>
            <EnergyLines active={showFx && bootPhase !== 'idle'} />
            <ParticleLayer active={showFx} />
            <div className="dex-content-scrim" aria-hidden />
            <div style={{ position: 'relative', zIndex: 10, padding: 16 }}>
              <DeviceScreen />
            </div>
          </DeviceFrame>
        </div>
      )}
    </AnimatePresence>
  )
})

import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDeviceStore } from '@dex/stores/device-store'

export const DexBootSequence = memo(function DexBootSequence() {
  const bootPhase = useDeviceStore((s) => s.bootPhase)
  const setBootPhase = useDeviceStore((s) => s.setBootPhase)
  const initialize = useDeviceStore((s) => s.initialize)

  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase('energy'), 400),
      setTimeout(() => setBootPhase('assemble'), 1000),
      setTimeout(() => setBootPhase('boot'), 1500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [setBootPhase])

  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 p-6 text-center">
      <motion.div
        className="dex-neon-text text-lg font-bold tracking-[0.15em]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        DEX v3.0
      </motion.div>

      <motion.div
        className="text-[10px] tracking-[0.25em] uppercase"
        style={{ color: 'var(--dex-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: bootPhase !== 'materialize' ? 1 : 0 }}
      >
        Institute Of Sound Intelligence System
      </motion.div>

      <motion.div
        className="text-xs"
        style={{ color: 'var(--dex-success)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: bootPhase === 'boot' || bootPhase === 'ready' ? 1 : 0 }}
      >
        STATUS: ONLINE
      </motion.div>

      <motion.div
        className="max-w-[280px] text-xs leading-relaxed"
        style={{ color: 'var(--dex-white)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: bootPhase === 'boot' ? 1 : 0 }}
      >
        <p className="mb-2">Welcome, Explorer.</p>
        <p style={{ color: 'var(--dex-muted)' }}>
          This device contains artist intelligence, discography records, lyric archives, network metadata and signal
          analysis.
        </p>
      </motion.div>

      {bootPhase === 'boot' && (
        <motion.button
          type="button"
          className="dex-interactive mt-2 rounded border px-6 py-2 text-xs tracking-[0.2em] uppercase"
          style={{
            borderColor: 'var(--dex-cyan)',
            color: 'var(--dex-cyan)',
            background: 'rgba(0, 220, 255, 0.08)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ boxShadow: '0 0 20px rgba(0,220,255,0.35)' }}
          onClick={initialize}
        >
          Initialize DEX
        </motion.button>
      )}
    </div>
  )
})

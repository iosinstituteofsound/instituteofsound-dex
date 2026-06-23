import { memo } from 'react'
import { motion } from 'framer-motion'

export const EnergyLines = memo(function EnergyLines({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 380 520"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M40 80 L190 20 L340 80"
        stroke="var(--dex-cyan)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.path
        d="M30 480 L190 500 L350 480"
        stroke="var(--dex-blue)"
        strokeWidth="1"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      />
      <motion.line
        x1="0"
        y1="260"
        x2="380"
        y2="260"
        stroke="var(--dex-cyan)"
        strokeWidth="0.5"
        strokeOpacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />
    </svg>
  )
})

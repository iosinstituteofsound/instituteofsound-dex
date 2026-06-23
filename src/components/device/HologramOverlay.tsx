import { memo } from 'react'

export const HologramOverlay = memo(function HologramOverlay({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${subtle ? 'dex-hologram-subtle' : 'opacity-[0.03]'}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,220,255,0.35) 3px, rgba(0,220,255,0.35) 4px)',
      }}
      aria-hidden
    />
  )
})

import { memo } from 'react'
import { motion } from 'framer-motion'
import { DexLiveHud } from '@dex/components/device/DexLiveHud'

const DEVICE_CLIP_PATH =
  'polygon(12% 0%, 88% 0%, 100% 8%, 100% 92%, 88% 100%, 12% 100%, 0% 92%, 0% 8%)'

export const DeviceFrame = memo(function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="dex-device-frame dex-glass dex-interactive relative overflow-hidden"
      style={{
        width: 380,
        maxWidth: 'calc(100vw - 32px)',
        clipPath: DEVICE_CLIP_PATH,
      }}
      initial={{ opacity: 0, scale: 0.88, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dex-device-backdrop" style={{ clipPath: DEVICE_CLIP_PATH }} aria-hidden />
      <DexLiveHud />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,220,255,0.08) 0%, transparent 40%, rgba(0,136,255,0.06) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-[2px] z-[1]"
        style={{
          clipPath: DEVICE_CLIP_PATH,
          border: '1px solid rgba(0, 220, 255, 0.12)',
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  )
})

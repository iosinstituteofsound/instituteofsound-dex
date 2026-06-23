import { memo } from 'react'

export const DexSkeleton = memo(function DexSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="dex-skeleton flex flex-col gap-2 p-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm"
          style={{
            width: `${70 + ((i * 17) % 30)}%`,
            background: 'linear-gradient(90deg, rgba(0,180,255,0.08), rgba(0,220,255,0.2), rgba(0,180,255,0.08))',
            animation: 'dex-pulse 1.6s ease-in-out infinite',
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
})

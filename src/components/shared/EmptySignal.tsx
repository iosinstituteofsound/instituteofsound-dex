import { memo } from 'react'

interface EmptySignalProps {
  title: string
  message: string
  code?: string
}

export const EmptySignal = memo(function EmptySignal({ title, message, code = 'NO_SIGNAL' }: EmptySignalProps) {
  return (
    <div
      className="dex-empty flex flex-col items-center justify-center gap-2 p-5 text-center"
      style={{ color: 'var(--dex-muted)', minHeight: 120 }}
    >
      <div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(0, 220, 255, 0.45)' }}>
        {code}
      </div>
      <div className="text-xs font-medium" style={{ color: 'var(--dex-white)' }}>
        {title}
      </div>
      <p className="max-w-[260px] text-[11px] leading-relaxed">{message}</p>
    </div>
  )
})

import { memo, useMemo } from 'react'

interface HudChartProps {
  values: number[]
  labels?: string[]
  height?: number
}

export const HudChart = memo(function HudChart({ values, labels, height = 80 }: HudChartProps) {
  const max = Math.max(...values, 1)
  const points = useMemo(() => {
    const w = 280
    const step = w / Math.max(values.length - 1, 1)
    return values
      .map((v, i) => {
        const x = i * step
        const y = height - (v / max) * (height - 8)
        return `${x},${y}`
      })
      .join(' ')
  }, [values, max, height])

  return (
    <svg viewBox={`0 0 280 ${height}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="dex-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="dex-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--dex-blue)" />
          <stop offset="100%" stopColor="var(--dex-cyan)" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#dex-line-grad)"
        strokeWidth="2"
        points={points}
        filter="url(#dex-glow)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {labels?.map((label, i) => (
        <text
          key={label}
          x={(280 / Math.max(labels.length - 1, 1)) * i}
          y={height + 14}
          fill="var(--dex-muted)"
          fontSize="8"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  )
})

import { memo, useEffect, useState } from 'react'

export const DexLiveHud = memo(function DexLiveHud() {
  const [tick, setTick] = useState(0)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1)
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const signal = 92 + (tick % 7)

  return (
    <div className="dex-live-hud pointer-events-none absolute inset-0 z-[3]" aria-hidden>
      <div className="dex-live-hud__corner dex-live-hud__corner--tl" />
      <div className="dex-live-hud__corner dex-live-hud__corner--tr" />
      <div className="dex-live-hud__corner dex-live-hud__corner--bl" />
      <div className="dex-live-hud__corner dex-live-hud__corner--br" />
      <div className="dex-live-hud__scanline" />
      <div className="dex-live-hud__status">
        <span className="dex-live-hud__led" />
        <span>SYS ONLINE</span>
        <span className="dex-live-hud__sep">·</span>
        <span>{clock}</span>
        <span className="dex-live-hud__sep">·</span>
        <span>SIG {signal}%</span>
      </div>
    </div>
  )
})

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDeviceStore } from '@dex/stores/device-store'
import { useIconStore } from '@dex/stores/icon-store'

const ICON = 56

export const DexFloatingIcon = memo(function DexFloatingIcon() {
  const toggle = useDeviceStore((s) => s.toggle)
  const contextPulse = useDeviceStore((s) => s.contextPulse)
  const right = useIconStore((s) => s.right)
  const bottom = useIconStore((s) => s.bottom)
  const setAnchor = useIconStore((s) => s.setAnchor)
  const dragging = useRef(false)
  const pointerActive = useRef(false)
  const start = useRef({ x: 0, y: 0, right: 0, bottom: 0 })
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (contextPulse <= 0) return
    setPulse(true)
    const id = window.setTimeout(() => setPulse(false), 600)
    return () => window.clearTimeout(id)
  }, [contextPulse])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      dragging.current = false
      pointerActive.current = true
      start.current = { x: e.clientX, y: e.clientY, right, bottom }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [right, bottom],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!pointerActive.current) return
      const dx = e.clientX - start.current.x
      const dy = e.clientY - start.current.y
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragging.current = true
      if (!dragging.current) return
      setAnchor(start.current.right - dx, start.current.bottom - dy)
    },
    [setAnchor],
  )

  const endPointer = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    pointerActive.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const wasDragging = dragging.current
      endPointer(e)
      if (!wasDragging) toggle()
      dragging.current = false
    },
    [endPointer, toggle],
  )

  const onPointerCancel = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      endPointer(e)
      dragging.current = false
    },
    [endPointer],
  )

  return (
    <button
      type="button"
      aria-label="Open DEX intelligence device"
      className={`dex-interactive dex-floating-icon${pulse ? ' dex-floating-icon--pulse' : ''}`}
      style={{ right, bottom, width: ICON, height: ICON }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <span className="dex-icon-aura" aria-hidden />
      <span className="dex-icon-orbit dex-icon-orbit--outer" aria-hidden />
      <span className="dex-icon-orbit dex-icon-orbit--inner" aria-hidden />
      <span className="dex-icon-sweep" aria-hidden />

      <span className="dex-icon-core" aria-hidden>
        <span className="dex-icon-hud">
          <span className="dex-icon-hud__corner dex-icon-hud__corner--tl" />
          <span className="dex-icon-hud__corner dex-icon-hud__corner--tr" />
          <span className="dex-icon-hud__corner dex-icon-hud__corner--bl" />
          <span className="dex-icon-hud__corner dex-icon-hud__corner--br" />
        </span>

        <span className="dex-icon-text" data-text="DEX">
          DEX
        </span>
      </span>

      <span className="dex-icon-led" aria-hidden />
    </button>
  )
})

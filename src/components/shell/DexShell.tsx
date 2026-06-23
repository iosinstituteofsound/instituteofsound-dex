import { memo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { DexContext, DexShellProps } from '@dex/types'
import { useContextStore } from '@dex/stores/context-store'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexFloatingIcon } from '@dex/components/shell/DexFloatingIcon'
import { DexDevice } from '@dex/components/shell/DexDevice'
import { DexProvider } from '@dex/providers/DexProvider'
import '@dex/styles/dex.css'

function ContextSync({ context }: { context?: DexContext }) {
  const setContext = useContextStore((s) => s.setContext)
  const pulseContext = useDeviceStore((s) => s.pulseContext)
  const prevRef = useRef<DexContext>({})

  useEffect(() => {
    if (!context) return
    const prev = prevRef.current
    const changed =
      context.trackId !== prev.trackId ||
      context.releaseId !== prev.releaseId ||
      context.artistProfileId !== prev.artistProfileId ||
      context.userId !== prev.userId
    if (changed) {
      setContext(context)
      pulseContext()
      prevRef.current = context
    }
  }, [context, setContext, pulseContext])

  return null
}

function DexShellInner({ context, className }: Pick<DexShellProps, 'context' | 'className'>) {
  const shell = (
    <div className={`dex-root ${className ?? ''}`}>
      <ContextSync context={context} />
      <DexFloatingIcon />
      <DexDevice />
    </div>
  )

  if (typeof document === 'undefined') return shell
  return createPortal(shell, document.body)
}

export const DexShell = memo(function DexShell({
  apiBaseUrl,
  getAccessToken,
  context,
  className,
}: DexShellProps) {
  return (
    <DexProvider config={{ apiBaseUrl, getAccessToken }}>
      <DexShellInner context={context} className={className} />
    </DexProvider>
  )
})

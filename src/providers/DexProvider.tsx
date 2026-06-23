import { useEffect, type ReactNode } from 'react'
import { configureDexClient } from '@dex/api/dex-client'
import type { DexConfig } from '@dex/types'

export function DexProvider({
  children,
  config,
}: {
  children: ReactNode
  config?: DexConfig
}) {
  useEffect(() => {
    if (config) configureDexClient(config)
  }, [config])

  return children
}

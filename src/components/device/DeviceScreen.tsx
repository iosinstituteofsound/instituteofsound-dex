import { lazy, memo, Suspense, type ComponentType } from 'react'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexBootSequence } from '@dex/components/shell/DexBootSequence'
import { ModuleGrid } from '@dex/components/modules/ModuleGrid'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { HologramOverlay } from '@dex/components/device/HologramOverlay'
import type { DexModuleId } from '@dex/types'

const NowPlayingPanel = lazy(() =>
  import('@dex/components/modules/now-playing/NowPlayingPanel').then((m) => ({ default: m.NowPlayingPanel })),
)
const ArtistScanPanel = lazy(() =>
  import('@dex/components/modules/artist-scan/ArtistScanPanel').then((m) => ({ default: m.ArtistScanPanel })),
)
const SignalArchivePanel = lazy(() =>
  import('@dex/components/modules/signal-archive/SignalArchivePanel').then((m) => ({ default: m.SignalArchivePanel })),
)
const LyricsDatabasePanel = lazy(() =>
  import('@dex/components/modules/lyrics-database/LyricsDatabasePanel').then((m) => ({ default: m.LyricsDatabasePanel })),
)
const NetworkIntelPanel = lazy(() =>
  import('@dex/components/modules/network-intel/NetworkIntelPanel').then((m) => ({ default: m.NetworkIntelPanel })),
)
const IdentityPanel = lazy(() =>
  import('@dex/components/modules/identity/IdentityPanel').then((m) => ({ default: m.IdentityPanel })),
)
const DexChatPanel = lazy(() =>
  import('@dex/components/modules/dex-chat/DexChatPanel').then((m) => ({ default: m.DexChatPanel })),
)

const PANELS: Record<DexModuleId, ComponentType> = {
  'now-playing': NowPlayingPanel,
  identity: IdentityPanel,
  'dex-chat': DexChatPanel,
  'artist-scan': ArtistScanPanel,
  'signal-archive': SignalArchivePanel,
  'lyrics-database': LyricsDatabasePanel,
  'network-intel': NetworkIntelPanel,
}

export const DeviceScreen = memo(function DeviceScreen() {
  const initialized = useDeviceStore((s) => s.initialized)
  const activeModule = useDeviceStore((s) => s.activeModule)

  if (!initialized) {
    return <DexBootSequence />
  }

  if (activeModule) {
    const Panel = PANELS[activeModule]
    return (
      <div className="relative flex h-full min-h-[420px] flex-col">
        <HologramOverlay subtle />
        <Suspense fallback={<DexSkeleton lines={6} />}>
          <Panel />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-[420px] flex-col">
      <HologramOverlay subtle />
      <ModuleGrid />
    </div>
  )
})

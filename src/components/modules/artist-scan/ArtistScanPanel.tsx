import { memo } from 'react'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { ArtistIntelligenceCard } from '@dex/components/shared/ArtistIntelligenceCard'
import { EmptySignal } from '@dex/components/shared/EmptySignal'

export const ArtistScanPanel = memo(function ArtistScanPanel() {
  const { data, isLoading, isError } = useDexContextQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const artist = data?.artist

  if (isLoading) return <DexSkeleton lines={8} />
  if (isError || !artist) {
    return (
      <EmptySignal
        title="No artist signal"
        message="Play a track or open an artist profile to scan intelligence data."
        code="SCAN_NULL"
      />
    )
  }

  return (
    <motion.div
      className="flex h-full flex-col gap-3 overflow-y-auto p-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxHeight: 420 }}
    >
      <button type="button" className="dex-interactive dex-btn-back" onClick={() => setActiveModule(null)}>
        ← Modules
      </button>

      <div className="dex-section-label">Artist Scan</div>

      <ArtistIntelligenceCard
        artist={artist}
        discography={data?.discography}
        listenerStat={data?.listenerStat}
        analytics={data?.analytics}
      />

      <Section title="Collaborators">
        <div className="dex-panel">
          <EmptySignal
            title="No collaborator index"
            message="Collaborator network data is not yet available in the signal archive."
            code="COLLAB_NULL"
          />
        </div>
      </Section>
    </motion.div>
  )
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="dex-section-label mb-2">{title}</div>
      {children}
    </div>
  )
}

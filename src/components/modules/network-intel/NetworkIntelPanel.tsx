import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { EmptySignal } from '@dex/components/shared/EmptySignal'
import { HudChart } from '@dex/components/shared/HudChart'

export const NetworkIntelPanel = memo(function NetworkIntelPanel() {
  const { data, isLoading, isError } = useDexContextQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const analytics = data?.analytics

  const hourValues = useMemo(
    () => analytics?.peakListenHours.map((h) => h.sessions) ?? [],
    [analytics],
  )
  const hourLabels = useMemo(
    () => analytics?.peakListenHours.map((h) => `${h.hour}h`) ?? [],
    [analytics],
  )

  if (isLoading) return <DexSkeleton lines={8} />
  if (isError || !analytics) {
    return (
      <EmptySignal
        title="No network telemetry"
        message="Listener statistics require a release with analytics data in the current context."
        code="NET_NULL"
      />
    )
  }

  return (
    <motion.div
      className="flex flex-col gap-3 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxHeight: 420 }}
    >
      <button
        type="button"
        className="dex-interactive self-start text-[10px] tracking-wider uppercase"
        style={{ color: 'var(--dex-muted)' }}
        onClick={() => setActiveModule(null)}
      >
        ← Modules
      </button>

      <div className="dex-neon-text text-[10px] tracking-[0.2em]">NETWORK INTEL · LIVE</div>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <Metric label="Qualified Plays" value={analytics.qualifiedPlays} />
        <Metric label="Listeners" value={analytics.uniqueListeners} />
        <Metric label="Locations" value={analytics.uniqueLocations} />
        <Metric label="Likes" value={analytics.activeLikes} />
        <Metric label="7d Plays" value={analytics.trendsPreview.last7d.plays} />
        <Metric label="30d Plays" value={analytics.trendsPreview.last30d.plays} />
      </div>

      {hourValues.length > 0 && (
        <div className="rounded border p-2" style={{ borderColor: 'rgba(0,220,255,0.15)' }}>
          <div className="mb-2 text-[9px] tracking-wider uppercase" style={{ color: 'var(--dex-muted)' }}>
            Peak Signal Hours
          </div>
          <HudChart values={hourValues} labels={hourLabels} />
        </div>
      )}

      {analytics.locations.length > 0 && (
        <div>
          <div className="mb-2 text-[9px] tracking-wider uppercase" style={{ color: 'var(--dex-muted)' }}>
            Top Regions
          </div>
          {analytics.locations.slice(0, 5).map((loc) => (
            <div
              key={`${loc.countryCode}-${loc.city}`}
              className="flex justify-between border-b py-1 text-[10px]"
              style={{ borderColor: 'rgba(0,220,255,0.08)', color: 'var(--dex-white)' }}
            >
              <span>{loc.city || loc.countryName || loc.countryCode || 'Unknown'}</span>
              <span style={{ color: 'var(--dex-cyan)' }}>{loc.sessions} sessions</span>
            </div>
          ))}
        </div>
      )}

      {data?.listenerStat && (
        <div className="rounded border p-2 text-[10px]" style={{ borderColor: 'rgba(0,220,255,0.15)' }}>
          <div style={{ color: 'var(--dex-muted)' }}>Artist DB Score</div>
          <div className="dex-neon-text text-lg font-bold">{data.listenerStat.dbScore}</div>
        </div>
      )}
    </motion.div>
  )
})

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border p-2" style={{ borderColor: 'rgba(0,220,255,0.12)' }}>
      <div style={{ color: 'var(--dex-muted)' }}>{label}</div>
      <div className="dex-neon-text text-sm font-bold">{value.toLocaleString()}</div>
    </div>
  )
}

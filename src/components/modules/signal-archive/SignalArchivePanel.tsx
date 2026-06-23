import { memo, useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { EmptySignal } from '@dex/components/shared/EmptySignal'
import type { ReleaseDto } from '@dex/types/api.types'

type ArchiveItem = {
  id: string
  title: string
  type: string
  date?: string
  playCount?: number
}

export const SignalArchivePanel = memo(function SignalArchivePanel() {
  const { data, isLoading, isError } = useDexContextQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const parentRef = useRef<HTMLDivElement>(null)

  const items = useMemo<ArchiveItem[]>(() => {
    if (!data?.discography) return []
    const mapRelease = (r: ReleaseDto): ArchiveItem => ({
      id: r.id,
      title: r.title,
      type: r.type.toUpperCase(),
      date: r.releaseDate,
      playCount: r.playCount,
    })
    return [
      ...data.discography.albumsAndEps.map(mapRelease),
      ...data.discography.singles.map(mapRelease),
      ...data.discography.popular.map((t) => ({
        id: t.id,
        title: t.title,
        type: (t.type ?? 'TRACK').toUpperCase(),
        date: t.releaseDate,
        playCount: t.playCount,
      })),
    ]
  }, [data])

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 6,
  })

  if (isLoading) return <DexSkeleton lines={8} />
  if (isError || items.length === 0) {
    return (
      <EmptySignal
        title="Archive empty"
        message="No discography records found for the current signal context."
        code="ARCHIVE_NULL"
      />
    )
  }

  return (
    <motion.div className="flex h-full flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button
        type="button"
        className="dex-interactive self-start text-[10px] tracking-wider uppercase"
        style={{ color: 'var(--dex-muted)' }}
        onClick={() => setActiveModule(null)}
      >
        ← Modules
      </button>
      <div className="dex-neon-text text-[10px] tracking-[0.2em]">SIGNAL ARCHIVE · {items.length} RECORDS</div>
      <div ref={parentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: 360 }}>
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {virtualizer.getVirtualItems().map((row) => {
            const item = items[row.index]
            return (
              <div
                key={item.id}
                className="absolute left-0 right-0 flex items-center gap-2 border-b px-2 py-2"
                style={{
                  height: row.size,
                  transform: `translateY(${row.start}px)`,
                  borderColor: 'rgba(0,220,255,0.08)',
                }}
              >
                <span className="text-[9px] tracking-wider" style={{ color: 'var(--dex-cyan)', width: 48 }}>
                  {item.type}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs" style={{ color: 'var(--dex-white)' }}>
                  {item.title}
                </span>
                {item.playCount != null && (
                  <span className="text-[9px]" style={{ color: 'var(--dex-muted)' }}>
                    {item.playCount} plays
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
})

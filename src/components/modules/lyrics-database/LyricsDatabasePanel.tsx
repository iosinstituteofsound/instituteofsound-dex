import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { EmptySignal } from '@dex/components/shared/EmptySignal'

export const LyricsDatabasePanel = memo(function LyricsDatabasePanel() {
  const { data } = useDexContextQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const [query, setQuery] = useState('')
  const [typed, setTyped] = useState('')
  const track = data?.track ?? data?.release?.tracks?.[0]

  useEffect(() => {
    const target = `> LOOKUP "${track?.title ?? 'UNKNOWN'}" ...`
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(target.slice(0, i))
      if (i >= target.length) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [track?.title])

  const hasLyrics = data?.capabilities.lyrics && data?.lyrics

  return (
    <motion.div className="flex h-full flex-col gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button
        type="button"
        className="dex-interactive self-start text-[10px] tracking-wider uppercase"
        style={{ color: 'var(--dex-muted)' }}
        onClick={() => setActiveModule(null)}
      >
        ← Modules
      </button>

      <div
        className="rounded border p-3 font-mono text-[10px]"
        style={{ borderColor: 'rgba(0,220,255,0.2)', background: 'rgba(0,10,20,0.6)', color: 'var(--dex-cyan)' }}
      >
        <div className="dex-terminal-cursor">{typed}</div>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lyric archive..."
        className="dex-interactive rounded border bg-transparent px-3 py-2 text-xs outline-none"
        style={{ borderColor: 'rgba(0,220,255,0.25)', color: 'var(--dex-white)' }}
      />

      {hasLyrics ? (
        <pre
          className="whitespace-pre-wrap rounded border p-3 font-mono text-[11px] leading-relaxed"
          style={{
            borderColor: 'rgba(0,220,255,0.2)',
            background: 'rgba(0,10,20,0.6)',
            color: 'var(--dex-white)',
          }}
        >
          {data?.lyrics}
        </pre>
      ) : (
        <EmptySignal
          title="Lyric archive not indexed"
          message={
            track
              ? `No lyrics indexed for "${track.title}". The lyric database will populate when API archives are online.`
              : 'Select a track to query the lyric database.'
          }
          code="LYRIC_NULL"
        />
      )}
    </motion.div>
  )
})

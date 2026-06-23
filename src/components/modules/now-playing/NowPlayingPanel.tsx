import { memo } from 'react'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { ArtistIntelligenceCard } from '@dex/components/shared/ArtistIntelligenceCard'
import { DexRemoteImage } from '@dex/components/shared/DexRemoteImage'
import { EmptySignal } from '@dex/components/shared/EmptySignal'
import type { DexModuleId } from '@dex/types'

function formatDuration(sec?: number) {
  if (!sec || sec <= 0) return '--:--'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function resolveAlbumArt(
  releaseCover?: string,
  trackCover?: string,
  artistCover?: string,
  artistAvatar?: string,
) {
  return releaseCover || trackCover || artistCover || artistAvatar
}

export const NowPlayingPanel = memo(function NowPlayingPanel() {
  const { data, isLoading, isError } = useDexContextQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const artist = data?.artist
  const track = data?.track ?? data?.release?.tracks?.[0]
  const release = data?.release
  const discography = data?.discography
  const lyrics = data?.lyrics
  const hasLyrics = Boolean(data?.capabilities.lyrics && lyrics)

  if (isLoading) return <DexSkeleton lines={10} />

  if (isError || (!artist && !track)) {
    return (
      <EmptySignal
        title="No playback signal"
        message="Play a track on the site to load artist intelligence and lyric archives."
        code="PLAYBACK_NULL"
      />
    )
  }

  const trackFromDiscography = track?.id ? discography?.tracks.find((t) => t.id === track.id) : undefined
  const albumArt = resolveAlbumArt(release?.coverUrl, trackFromDiscography?.coverUrl, artist?.coverUrl, artist?.avatarUrl)
  const artistName = artist?.displayName ?? release?.artistName ?? 'Unknown artist'
  const albumSeed = `${release?.id ?? 'release'}:${albumArt ?? ''}`

  return (
    <motion.div className="dex-now-playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="dex-panel-header">
        <button type="button" className="dex-interactive dex-btn-back" onClick={() => setActiveModule(null)}>
          ← Modules
        </button>
        <span className="dex-section-label">Now Playing</span>
      </div>

      <div className="dex-panel dex-panel--flush">
        <div className="dex-hero-art-frame">
          {albumArt ? (
            <DexRemoteImage
              src={albumArt}
              alt={track?.title ?? 'Album artwork'}
              cacheSeed={albumSeed}
              className="dex-hero-art"
              fallback={
                <div className="dex-hero-art dex-avatar-fallback" style={{ fontSize: 48 }}>
                  ♪
                </div>
              }
            />
          ) : (
            <div className="dex-hero-art dex-avatar-fallback" style={{ fontSize: 48 }}>
              ♪
            </div>
          )}
        </div>

        <div className="dex-now-playing-meta">
          <div className="dex-track-title">{track?.title ?? 'Unknown track'}</div>
          <div className="dex-track-artist">{artistName}</div>
          {release && (
            <div className="dex-track-sub">
              {release.title} · {release.type.toUpperCase()}
              {track?.durationSec ? ` · ${formatDuration(track.durationSec)}` : ''}
            </div>
          )}
        </div>
      </div>

      {artist && (
        <Section title="Artist Intelligence">
          <ArtistIntelligenceCard
            artist={artist}
            discography={discography}
            listenerStat={data?.listenerStat}
            analytics={data?.analytics}
            compact
          />
        </Section>
      )}

      <Section title="Lyric Archive">
        {hasLyrics ? (
          <pre
            className="dex-panel whitespace-pre-wrap p-3 font-mono text-[11px] leading-relaxed"
            style={{ color: 'var(--dex-white)' }}
          >
            {lyrics}
          </pre>
        ) : (
          <div className="dex-panel">
            <EmptySignal
              title="Lyric archive not indexed"
              message={
                track
                  ? `No lyrics indexed for "${track.title}". Lyrics will appear here when available in the archive.`
                  : 'Play a track to query the lyric database.'
              }
              code="LYRIC_NULL"
            />
          </div>
        )}
      </Section>

      <Section title="Deep Scan">
        <div className="grid grid-cols-2 gap-2">
          <ModuleLink id="signal-archive" label="Discography" onSelect={setActiveModule} />
          <ModuleLink id="network-intel" label="Analytics" onSelect={setActiveModule} />
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

function ModuleLink({
  id,
  label,
  onSelect,
}: {
  id: DexModuleId
  label: string
  onSelect: (id: DexModuleId) => void
}) {
  return (
    <button type="button" className="dex-interactive dex-module-link" onClick={() => onSelect(id)}>
      {label}
    </button>
  )
}

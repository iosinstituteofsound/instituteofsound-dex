import { memo } from 'react'
import { DexRemoteImage } from '@dex/components/shared/DexRemoteImage'
import { DexVerifiedBadge } from '@dex/components/shared/DexVerifiedBadge'
import type { ArtistProfileDto, DiscographyDto, ListenerStatDto, ReleaseAnalyticsSummaryDto } from '@dex/types/api.types'

interface ArtistIntelligenceCardProps {
  artist: ArtistProfileDto
  discography?: DiscographyDto
  listenerStat?: ListenerStatDto | null
  analytics?: ReleaseAnalyticsSummaryDto | null
  compact?: boolean
}

function formatCount(value?: number) {
  if (value === undefined || value === null) return '—'
  return value.toLocaleString()
}

export const ArtistIntelligenceCard = memo(function ArtistIntelligenceCard({
  artist,
  discography,
  listenerStat,
  analytics,
  compact = false,
}: ArtistIntelligenceCardProps) {
  const totalReleases =
    (discography?.albumsAndEps.length ?? 0) + (discography?.singles.length ?? 0) + (discography?.tracks.length ?? 0)
  const handle = artist.username ? `@${artist.username}` : `@${artist.slug}`

  return (
    <div className="dex-panel dex-artist-intel">
      <div className="dex-artist-intel__header">
        <DexRemoteImage
          src={artist.avatarUrl}
          alt={artist.displayName}
          cacheSeed={`${artist.id}:${artist.avatarUrl ?? ''}`}
          className={`dex-avatar ${compact ? 'dex-avatar--lg' : 'dex-avatar--xl'}`}
          fallback={
            <div
              className={`dex-avatar ${compact ? 'dex-avatar--lg' : 'dex-avatar--xl'} dex-avatar-fallback`}
              style={{ fontSize: compact ? 18 : 20 }}
            >
              {artist.displayName.slice(0, 1)}
            </div>
          }
        />
        <div className="min-w-0 flex-1">
          <div className="dex-artist-intel__name-row">
            <span className="dex-artist-intel__name">{artist.displayName}</span>
            {artist.isVerified ? <DexVerifiedBadge size={compact ? 14 : 16} /> : null}
          </div>
          <div className="dex-artist-intel__handle">{handle}</div>
          <div className="dex-artist-intel__status">
            {artist.isVerified ? 'STATUS: VERIFIED' : 'STATUS: ANALYZED'}
          </div>
          <div className="dex-artist-intel__meta">
            {artist.genres.join(' · ') || 'Genre unclassified'}
          </div>
          {artist.labelName ? <div className="dex-artist-intel__meta">Label: {artist.labelName}</div> : null}
        </div>
      </div>

      <div className="dex-artist-intel__network">
        <div className="dex-stat dex-stat--highlight">
          <div className="dex-stat__label">DB Rank</div>
          <div className="dex-stat__value">{listenerStat?.rank ? `#${listenerStat.rank}` : '—'}</div>
        </div>
        <div className="dex-stat dex-stat--highlight">
          <div className="dex-stat__label">DB Score</div>
          <div className="dex-stat__value">{formatCount(listenerStat?.dbScore)}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Total Plays</div>
          <div className="dex-stat__value">{formatCount(listenerStat?.totalPlays)}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Listeners</div>
          <div className="dex-stat__value">{formatCount(analytics?.uniqueListeners)}</div>
        </div>
        {analytics ? (
          <>
            <div className="dex-stat">
              <div className="dex-stat__label">Qualified Plays</div>
              <div className="dex-stat__value">{formatCount(analytics.qualifiedPlays)}</div>
            </div>
            <div className="dex-stat">
              <div className="dex-stat__label">Active Likes</div>
              <div className="dex-stat__value">{formatCount(analytics.activeLikes)}</div>
            </div>
          </>
        ) : null}
      </div>

      <div className="dex-artist-intel__catalog">
        <div className="dex-stat">
          <div className="dex-stat__label">Releases</div>
          <div className="dex-stat__value">{formatCount(totalReleases)}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Tracks</div>
          <div className="dex-stat__value">{formatCount(discography?.tracks.length)}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Popular</div>
          <div className="dex-stat__value">{formatCount(discography?.popular.length)}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Videos</div>
          <div className="dex-stat__value">{formatCount(discography?.musicVideos.length)}</div>
        </div>
      </div>

      {!compact && artist.bio ? (
        <p className="dex-artist-intel__bio">{artist.bio}</p>
      ) : null}
    </div>
  )
})

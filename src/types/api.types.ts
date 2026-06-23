export type ReleaseType = 'single' | 'ep' | 'album'

export interface ApiSuccessResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ArtistProfileDto {
  id: string
  userId: string
  slug: string
  displayName: string
  bio?: string
  avatarUrl?: string
  coverUrl?: string
  genres: string[]
  labelProfileId?: string
  labelName?: string
  hubId?: string
  isFeatured: boolean
  sortOrder: number
  artistPickReleaseId?: string
  isVerified?: boolean
  username?: string
}

export interface ReleaseDto {
  id: string
  artistProfileId: string
  artistName?: string
  title: string
  slug?: string
  coverUrl?: string
  releaseDate?: string
  type: ReleaseType
  genre?: string
  streamUrl?: string
  status?: 'draft' | 'published'
  playCount?: number
  labelProfileId?: string
  labelName?: string
  isFeatured: boolean
  durationSec?: number
  trackCount?: number
  primaryTrackId?: string
  tracks?: Array<{
    id: string
    title: string
    trackNumber?: number
    durationSec?: number
    audioUrl?: string
    playCount?: number
    lyrics?: string
  }>
}

export interface DiscographyTrackDto {
  id: string
  releaseId?: string
  artistProfileId?: string
  title: string
  coverUrl?: string
  artistName?: string
  streamUrl?: string
  playCount?: number
  durationSec?: number
  releaseDate?: string
  type?: ReleaseType
  genre?: string
}

export interface DiscographyDto {
  artist: ArtistProfileDto | null
  latestRelease: ReleaseDto | null
  popular: DiscographyTrackDto[]
  tracks: DiscographyTrackDto[]
  artistPick: ReleaseDto | null
  albumsAndEps: ReleaseDto[]
  singles: ReleaseDto[]
  musicVideos: Array<{
    id: string
    artistProfileId: string
    title: string
    thumbnailUrl?: string
    videoUrl: string
    durationSec?: number
    viewCount?: number
    releaseDate?: string
  }>
}

export interface ReleaseDetailDto extends ReleaseDto {
  tracks: Array<{
    id: string
    title: string
    trackNumber?: number
    durationSec?: number
    audioUrl?: string
    playCount?: number
    artistProfileId?: string
    lyrics?: string
  }>
}

export interface TrackRedirectDto {
  releaseId: string
}

export interface ListenerProfileDto {
  userId: string
  name: string
  avatarUrl?: string
  listenSec?: number
  qualifiedPlays?: number
}

export interface LocationAggregateDto {
  countryCode?: string
  countryName?: string
  city?: string
  sessions: number
  listenSec: number
}

export interface ReleaseAnalyticsSummaryDto {
  releaseId: string
  qualifiedPlays: number
  totalListenSec: number
  averageListenSec: number
  completionRate: number
  skipRate: number
  likeCount: number
  unlikeCount: number
  activeLikes: number
  uniqueListeners: number
  uniqueLocations: number
  peakListenHours: Array<{ hour: number; sessions: number }>
  topListeners: ListenerProfileDto[]
  locations: LocationAggregateDto[]
  tracks: Array<{
    trackId: string
    title: string
    qualifiedPlays: number
    totalListenSec: number
    uniqueListeners: number
  }>
  trendsPreview: {
    last7d: { plays: number; listenSec: number }
    last30d: { plays: number; listenSec: number }
  }
  userLiked?: boolean
}

export interface ListenerStatDto {
  userId: string
  name: string
  avatarUrl?: string
  dbScore: number
  rank: number
  totalPlays: number
}

export interface DexIdentityProfileDto {
  source: string
  version: string
  updatedAt: string
  profile: {
    userId: string
    name: string
    role: string
    rank: string
    level: number
    xp: { current: number; target: number }
    dbScore: number
    totalPlays: number
    avatarUrl?: string
    username?: string
    bio?: string
    isVerified?: boolean
    orgLabel?: string
    linkUrl?: string
    memberSince?: string
    email?: string
    badgeCount: number
    achievementCount: number
  }
  authorization: {
    activeRoleId?: string
    assignedRoles: Array<{ id: string; slug: string; name: string }>
    isSuperAdmin: boolean
    permissions: string[]
  }
}

export interface DexContextPayload {
  artist: ArtistProfileDto | null
  track?: DiscographyTrackDto | null
  release?: ReleaseDetailDto | null
  discography: DiscographyDto
  analytics?: ReleaseAnalyticsSummaryDto | null
  listenerStat?: ListenerStatDto | null
  lyrics?: string | null
  collaborators?: []
  capabilities: {
    lyrics: boolean
    collaborators: boolean
  }
}

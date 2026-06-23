import { apiPath, getDexClient } from './dex-client'
import type { ApiSuccessResponse, DexContextPayload } from '@dex/types/api.types'
import type { DiscographyDto, ReleaseAnalyticsSummaryDto, ReleaseDetailDto, TrackRedirectDto } from '@dex/types/api.types'
import type { DexContext } from '@dex/types'

export async function fetchDexContext(params: DexContext): Promise<DexContextPayload> {
  const { data } = await getDexClient().get<ApiSuccessResponse<DexContextPayload>>(apiPath('/dex/context'), {
    params: {
      trackId: params.trackId || undefined,
      releaseId: params.releaseId || undefined,
      artistProfileId: params.artistProfileId || undefined,
      userId: params.userId || undefined,
    },
  })
  return data.data
}

export async function fetchTrackRedirect(trackId: string): Promise<TrackRedirectDto> {
  const { data } = await getDexClient().get<ApiSuccessResponse<TrackRedirectDto>>(apiPath(`/music/tracks/${trackId}`))
  return data.data
}

export async function fetchReleaseDetail(releaseId: string): Promise<ReleaseDetailDto> {
  const { data } = await getDexClient().get<ApiSuccessResponse<ReleaseDetailDto>>(apiPath(`/releases/${releaseId}`))
  return data.data
}

export async function fetchDiscography(userId: string): Promise<DiscographyDto> {
  const { data } = await getDexClient().get<ApiSuccessResponse<DiscographyDto>>(
    apiPath(`/explore/discography/${userId}`),
  )
  return data.data
}

export async function fetchReleaseAnalytics(releaseId: string): Promise<ReleaseAnalyticsSummaryDto> {
  const { data } = await getDexClient().get<ApiSuccessResponse<ReleaseAnalyticsSummaryDto>>(
    apiPath(`/music/releases/${releaseId}/analytics`),
  )
  return data.data
}

export async function resolveDexContext(input: DexContext): Promise<DexContextPayload> {
  try {
    return await fetchDexContext(input)
  } catch {
    return resolveDexContextWaterfall(input)
  }
}

async function resolveDexContextWaterfall(input: DexContext): Promise<DexContextPayload> {
  let releaseId = input.releaseId
  let artistProfileId = input.artistProfileId
  let userId = input.userId
  let release: ReleaseDetailDto | null = null
  let track = null

  if (input.trackId && !releaseId) {
    const redirect = await fetchTrackRedirect(input.trackId)
    releaseId = redirect.releaseId
  }

  if (releaseId) {
    release = await fetchReleaseDetail(releaseId)
    artistProfileId = artistProfileId || release.artistProfileId
    if (input.trackId && release.tracks) {
      track = release.tracks.find((t) => t.id === input.trackId) ?? null
    }
  }

  const discography = userId
    ? await fetchDiscography(userId)
    : { artist: null, latestRelease: null, popular: [], tracks: [], artistPick: null, albumsAndEps: [], singles: [], musicVideos: [] }

  if (!userId && artistProfileId && discography.artist?.userId) {
    userId = discography.artist.userId
  }

  if (userId && !discography.artist) {
    const full = await fetchDiscography(userId)
    Object.assign(discography, full)
  } else if (!userId && release) {
    const artists = await getDexClient().get(apiPath('/explore/artists'), { params: { filter: 'all' } })
    const list = artists.data?.data as Array<{ id: string; userId: string }> | undefined
    const match = list?.find((a) => a.id === artistProfileId)
    if (match) {
      userId = match.userId
      const full = await fetchDiscography(userId)
      Object.assign(discography, full)
    }
  }

  let analytics: ReleaseAnalyticsSummaryDto | null = null
  if (releaseId) {
    try {
      analytics = await fetchReleaseAnalytics(releaseId)
    } catch {
      analytics = null
    }
  }

  const lyricsText =
    track && 'lyrics' in track && typeof track.lyrics === 'string' && track.lyrics.trim()
      ? track.lyrics.trim()
      : null

  return {
    artist: discography.artist,
    track,
    release,
    discography,
    analytics,
    lyrics: lyricsText,
    collaborators: [],
    capabilities: { lyrics: Boolean(lyricsText), collaborators: false },
  }
}

import { useQuery } from '@tanstack/react-query'
import { resolveDexContext } from '@dex/api/context.api'
import { useContextStore } from '@dex/stores/context-store'

export function useDexContextQuery() {
  const trackId = useContextStore((s) => s.trackId)
  const releaseId = useContextStore((s) => s.releaseId)
  const artistProfileId = useContextStore((s) => s.artistProfileId)
  const userId = useContextStore((s) => s.userId)

  const hasContext = Boolean(trackId || releaseId || artistProfileId || userId)

  return useQuery({
    queryKey: ['dex', 'context', trackId, releaseId, artistProfileId, userId],
    queryFn: () => resolveDexContext({ trackId, releaseId, artistProfileId, userId }),
    enabled: hasContext,
    staleTime: 30_000,
    refetchInterval: 45_000,
    refetchOnWindowFocus: true,
  })
}

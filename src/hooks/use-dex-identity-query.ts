import { useQuery } from '@tanstack/react-query'
import { fetchDexIdentityProfile } from '@dex/api/identity.api'
import { getDexConfig } from '@dex/api/dex-client'

export function useDexIdentityQuery() {
  const accessToken = getDexConfig().getAccessToken?.() ?? null
  const hasToken = Boolean(accessToken)

  return useQuery({
    queryKey: ['dex', 'identity-profile', accessToken],
    queryFn: fetchDexIdentityProfile,
    enabled: hasToken,
    staleTime: 30_000,
    refetchInterval: 45_000,
    retry: 1,
  })
}

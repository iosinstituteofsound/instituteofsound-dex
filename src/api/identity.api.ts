import { apiPath, getDexClient } from './dex-client'
import type { ApiSuccessResponse } from '@dex/types/api.types'
import type { DexIdentityProfileDto } from '@dex/types/api.types'

export async function fetchDexIdentityProfile(): Promise<DexIdentityProfileDto> {
  const { data } = await getDexClient().get<ApiSuccessResponse<DexIdentityProfileDto>>(apiPath('/dex/profile'))
  return data.data
}

import axios, { type AxiosInstance } from 'axios'
import type { DexConfig } from '@dex/types'

const API_V1 = '/api/v1'

let client: AxiosInstance | null = null
let config: DexConfig = {}

export function configureDexClient(next: DexConfig) {
  config = next
  client = axios.create({
    baseURL: config.apiBaseUrl || undefined,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })

  client.interceptors.request.use((req) => {
    const token = config.getAccessToken?.()
    if (token) req.headers.Authorization = `Bearer ${token}`
    return req
  })
}

export function getDexClient(): AxiosInstance {
  if (!client) configureDexClient(config)
  return client!
}

export function apiPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_V1}${normalized}`
}

export function getDexConfig(): DexConfig {
  return config
}

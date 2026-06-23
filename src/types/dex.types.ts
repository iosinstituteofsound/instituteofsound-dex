export type DexModuleId =
  | 'now-playing'
  | 'identity'
  | 'dex-chat'
  | 'artist-scan'
  | 'signal-archive'
  | 'lyrics-database'
  | 'network-intel'

export type DexBootPhase = 'idle' | 'materialize' | 'energy' | 'assemble' | 'boot' | 'ready'

export interface DexContext {
  trackId?: string
  releaseId?: string
  artistProfileId?: string
  userId?: string
}

export interface DexConfig {
  apiBaseUrl?: string
  getAccessToken?: () => string | null | undefined
}

export interface DexShellProps extends DexConfig {
  context?: DexContext
  className?: string
}

export interface DexCapabilities {
  lyrics: boolean
  collaborators: boolean
}

export interface AudioPack {
  boot?: string
  scan?: string
  hover?: string
  hologram?: string
}

import { useDeviceStore } from '@dex/stores/device-store'
import type { DexModuleId } from '@dex/types'

export function openDexForPlayback(module: DexModuleId = 'now-playing') {
  useDeviceStore.getState().openForPlayback(module)
}

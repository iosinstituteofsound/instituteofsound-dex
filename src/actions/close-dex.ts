import { useDeviceStore } from '@dex/stores/device-store'

export function closeDex() {
  useDeviceStore.getState().close()
}

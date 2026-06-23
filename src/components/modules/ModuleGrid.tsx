import { memo } from 'react'
import { motion } from 'framer-motion'
import type { DexModuleId } from '@dex/types'
import { useDeviceStore } from '@dex/stores/device-store'

const MODULES: Array<{
  id: DexModuleId
  label: string
  icon: string
  desc: string
}> = [
  { id: 'identity', label: 'Identity', icon: '◉', desc: 'Your operator profile' },
  { id: 'dex-chat', label: 'Dex Chat', icon: '▸', desc: 'Intelligence uplink' },
  { id: 'artist-scan', label: 'Artist Scan', icon: '◎', desc: 'Profile intelligence' },
  { id: 'signal-archive', label: 'Signal Archive', icon: '▣', desc: 'Discography records' },
  { id: 'lyrics-database', label: 'Lyrics DB', icon: '≡', desc: 'Lyric archives' },
  { id: 'network-intel', label: 'Network Intel', icon: '◈', desc: 'Signal analysis' },
]

export const ModuleIcon = memo(function ModuleIcon({
  icon,
  label,
  desc,
  onClick,
}: {
  icon: string
  label: string
  desc: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      className="dex-interactive dex-module-tile"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="dex-module-tile__icon dex-neon-text">{icon}</span>
      <span className="dex-module-tile__label">{label}</span>
      <span className="dex-module-tile__desc">{desc}</span>
    </motion.button>
  )
})

export const ModuleGrid = memo(function ModuleGrid() {
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)

  return (
    <div className="dex-module-grid">
      <div className="text-center">
        <div className="dex-neon-text text-xs tracking-[0.2em]">MODULE SELECT</div>
        <div className="mt-1 text-[10px]" style={{ color: 'var(--dex-muted)' }}>
          Choose intelligence channel
        </div>
      </div>
      <div className="dex-module-grid__tiles">
        {MODULES.map((mod) => (
          <ModuleIcon
            key={mod.id}
            icon={mod.icon}
            label={mod.label}
            desc={mod.desc}
            onClick={() => setActiveModule(mod.id)}
          />
        ))}
      </div>
    </div>
  )
})

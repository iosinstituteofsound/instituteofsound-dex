import { memo } from 'react'
import { motion } from 'framer-motion'
import { useDexIdentityQuery } from '@dex/hooks/use-dex-identity-query'
import { useDeviceStore } from '@dex/stores/device-store'
import { DexSkeleton } from '@dex/components/shared/DexSkeleton'
import { DexRemoteImage } from '@dex/components/shared/DexRemoteImage'
import { DexVerifiedBadge } from '@dex/components/shared/DexVerifiedBadge'
import { EmptySignal } from '@dex/components/shared/EmptySignal'

function formatMemberSince(value?: string) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(value))
}

function xpPercent(current: number, target: number) {
  if (target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

export const IdentityPanel = memo(function IdentityPanel() {
  const { data, isLoading, isError } = useDexIdentityQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const profile = data?.profile

  if (isLoading) return <DexSkeleton lines={10} />

  if (isError || !profile) {
    return (
      <EmptySignal
        title="Identity signal offline"
        message="Sign in to sync your operator identity, DB rank, and network credentials."
        code="ID_NULL"
      />
    )
  }

  const handle = profile.username ? `@${profile.username}` : `@${profile.userId.slice(-8)}`
  const xpPct = xpPercent(profile.xp.current, profile.xp.target)

  return (
    <motion.div className="dex-now-playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button type="button" className="dex-interactive dex-btn-back" onClick={() => setActiveModule(null)}>
        ← Modules
      </button>

      <div className="dex-section-label">Identity Matrix</div>

      <div className="dex-panel dex-identity-hero">
        <div className="dex-identity-hero__avatar-shell">
          <div className="dex-identity-hero__ring" style={{ '--dex-xp': `${xpPct}%` } as React.CSSProperties} aria-hidden />
          <DexRemoteImage
            src={profile.avatarUrl}
            alt={profile.name}
            cacheSeed={`${profile.userId}:${profile.avatarUrl ?? ''}`}
            className="dex-avatar dex-avatar--identity"
            fallback={
              <div className="dex-avatar dex-avatar--identity dex-avatar-fallback" style={{ fontSize: 36 }}>
                {profile.name.slice(0, 1)}
              </div>
            }
          />
        </div>
        <div className="dex-identity-hero__name-row">
          <span className="dex-identity-hero__name">{profile.name}</span>
          {profile.isVerified ? <DexVerifiedBadge size={18} /> : null}
        </div>
        <div className="dex-artist-intel__handle">{handle}</div>
        <div className="dex-artist-intel__status">{profile.isVerified ? 'STATUS: VERIFIED' : 'STATUS: ONLINE'}</div>
        <div className="dex-identity-hero__role">{profile.role}</div>
      </div>

      <div className="dex-artist-intel__network">
        <div className="dex-stat dex-stat--highlight">
          <div className="dex-stat__label">DB Rank</div>
          <div className="dex-stat__value">{profile.rank}</div>
        </div>
        <div className="dex-stat dex-stat--highlight">
          <div className="dex-stat__label">DB Score</div>
          <div className="dex-stat__value">{profile.dbScore.toLocaleString()}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Level</div>
          <div className="dex-stat__value">Lv {profile.level}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Total Plays</div>
          <div className="dex-stat__value">{profile.totalPlays.toLocaleString()}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Badges</div>
          <div className="dex-stat__value">{profile.badgeCount}</div>
        </div>
        <div className="dex-stat">
          <div className="dex-stat__label">Achievements</div>
          <div className="dex-stat__value">{profile.achievementCount}</div>
        </div>
      </div>

      <div className="dex-panel dex-identity-xp">
        <div className="dex-identity-xp__label">
          <span>XP SYNC</span>
          <span>
            {profile.xp.current.toLocaleString()} / {profile.xp.target.toLocaleString()}
          </span>
        </div>
        <div className="dex-identity-xp__bar">
          <div className="dex-identity-xp__fill" style={{ width: `${xpPct}%` }} />
        </div>
      </div>

      <div className="dex-panel dex-identity-fields">
        <Field label="Email" value={profile.email ?? '—'} />
        <Field label="Organization" value={profile.orgLabel ?? '—'} />
        <Field label="Member Since" value={formatMemberSince(profile.memberSince)} />
        {profile.bio ? <Field label="Bio" value={profile.bio} multiline /> : null}
        {data.authorization.isSuperAdmin ? (
          <div className="dex-identity-admin">ADMIN CLEARANCE · ACTIVE</div>
        ) : null}
      </div>
    </motion.div>
  )
})

function Field({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="dex-identity-field">
      <div className="dex-identity-field__label">{label}</div>
      <div className={multiline ? 'dex-identity-field__value dex-identity-field__value--multiline' : 'dex-identity-field__value'}>
        {value}
      </div>
    </div>
  )
}

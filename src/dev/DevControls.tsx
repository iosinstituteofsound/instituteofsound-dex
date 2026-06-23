import { useState } from 'react'

interface DevControlsProps {
  onContextChange: (ctx: { trackId?: string; userId?: string; artistProfileId?: string }) => void
}

export function DevControls({ onContextChange }: DevControlsProps) {
  const [trackId, setTrackId] = useState('')
  const [userId, setUserId] = useState('')
  const [artistProfileId, setArtistProfileId] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      <label>
        trackId{' '}
        <input value={trackId} onChange={(e) => setTrackId(e.target.value)} style={{ marginLeft: 4 }} />
      </label>
      <label>
        userId <input value={userId} onChange={(e) => setUserId(e.target.value)} style={{ marginLeft: 4 }} />
      </label>
      <label>
        artistProfileId{' '}
        <input value={artistProfileId} onChange={(e) => setArtistProfileId(e.target.value)} style={{ marginLeft: 4 }} />
      </label>
      <button
        type="button"
        onClick={() =>
          onContextChange({
            trackId: trackId || undefined,
            userId: userId || undefined,
            artistProfileId: artistProfileId || undefined,
          })
        }
      >
        Apply Context
      </button>
    </div>
  )
}

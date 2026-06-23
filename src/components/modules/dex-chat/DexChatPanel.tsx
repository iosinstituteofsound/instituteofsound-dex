import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDexContextQuery } from '@dex/hooks/use-dex-context-query'
import { useDexIdentityQuery } from '@dex/hooks/use-dex-identity-query'
import { useDeviceStore } from '@dex/stores/device-store'

type ChatRole = 'user' | 'dex'

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

function buildDexReply(input: string, context: ReturnType<typeof useDexContextQuery>['data'], identity: ReturnType<typeof useDexIdentityQuery>['data']) {
  const q = input.trim().toLowerCase()
  const artist = context?.artist?.displayName
  const track = context?.track?.title ?? context?.release?.tracks?.[0]?.title
  const rank = identity?.profile.rank
  const dbScore = identity?.profile.dbScore

  if (!q || q === 'help') {
    return 'Channels: artist, track, rank, score, lyrics, identity, modules. Query the intelligence archive.'
  }
  if (q.includes('rank')) {
    return rank ? `Your DB rank is ${rank}. Network resonance active.` : 'Rank data unavailable. Play tracks to build signal.'
  }
  if (q.includes('score') || q.includes('db')) {
    return typeof dbScore === 'number' ? `DB score: ${dbScore.toLocaleString()} units.` : 'DB score offline.'
  }
  if (q.includes('artist') && artist) return `Artist scan: ${artist}. Open Artist Scan for full intelligence.`
  if (q.includes('track') && track) return `Now playing signal: "${track}".`
  if (q.includes('lyric')) {
    return context?.lyrics ? 'Lyric archive indexed for current track.' : 'Lyric archive not indexed for this track yet.'
  }
  if (q.includes('identity') || q.includes('who am')) {
    const name = identity?.profile.name ?? 'Operator'
    return `Identity confirmed: ${name}${identity?.profile.isVerified ? ' · VERIFIED' : ''}.`
  }
  if (q.includes('hello') || q.includes('hi')) return 'DEX online. Intelligence channels ready.'
  return 'Signal received. Try: artist, track, rank, lyrics, identity.'
}

export const DexChatPanel = memo(function DexChatPanel() {
  const { data: context } = useDexContextQuery()
  const { data: identity } = useDexIdentityQuery()
  const setActiveModule = useDeviceStore((s) => s.setActiveModule)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'boot', role: 'dex', text: 'DEX CHAT uplink established. Ask about artist, track, rank, or lyrics.' },
  ])
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = useCallback(() => {
    const text = draft.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text }
    const reply: ChatMessage = {
      id: `d-${Date.now()}`,
      role: 'dex',
      text: buildDexReply(text, context, identity),
    }
    setMessages((prev) => [...prev, userMsg, reply])
    setDraft('')
  }, [draft, context, identity])

  return (
    <motion.div className="dex-chat flex h-full min-h-[380px] flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button type="button" className="dex-interactive dex-btn-back" onClick={() => setActiveModule(null)}>
        ← Modules
      </button>
      <div className="dex-section-label">Dex Chat</div>

      <div ref={scrollRef} className="dex-chat__log dex-panel flex-1 overflow-y-auto p-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`dex-chat__line dex-chat__line--${msg.role}`}>
            <span className="dex-chat__prefix">{msg.role === 'dex' ? 'DEX>' : 'YOU>'}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <form
        className="dex-chat__composer"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Transmit query..."
          className="dex-interactive dex-chat__input"
        />
        <button type="submit" className="dex-interactive dex-chat__send">
          SEND
        </button>
      </form>
    </motion.div>
  )
})

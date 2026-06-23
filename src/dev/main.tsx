import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { DexProvider } from '@dex/providers/DexProvider'
import { DexShell } from '@dex/components/shell/DexShell'
import { DevControls } from '@dex/dev/DevControls'
import '@dex/styles/dex.css'

function DevApp() {
  const [context, setContext] = useState<{ trackId?: string; userId?: string; artistProfileId?: string }>({})

  return (
    <DexProvider config={{ apiBaseUrl: '' }}>
      <div style={{ minHeight: '100vh', background: '#040a12', color: '#e8f4ff', padding: 24 }}>
        <h1 style={{ fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.2em', marginBottom: 16 }}>
          DEX DEV CONSOLE
        </h1>
        <DevControls onContextChange={setContext} />
        <DexShell context={context} />
      </div>
    </DexProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevApp />
  </StrictMode>,
)

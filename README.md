# DEX — Institute of Sound Artist Intelligence Device

Futuristic floating artist intelligence scanner for Institute of Sound.

## Packages

- **Library export:** `@instituteofsound/dex` — embed in `instituteofsound-web` via `<DexShell />`
- **Standalone dev:** `npm run dev` on port **5174**

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Standalone dev app with context controls |
| `npm run build:lib` | Build ESM library to `dist/` |
| `npm run build` | Typecheck + library build |
| `npm run typecheck` | TypeScript check |

## Web integration

```tsx
import { DexShell } from '@instituteofsound/dex'
import '@instituteofsound/dex/styles/dex.css'

<DexShell
  apiBaseUrl={env.apiBaseUrl}
  getAccessToken={() => tokenStorage.getAccessToken()}
  context={{ trackId, artistProfileId, userId, releaseId }}
/>
```

## API

DEX consumes `GET /api/v1/dex/context` (aggregated) with fallback to existing explore/music endpoints.

## Future

- Tauri desktop wrapper (`src-tauri/`)
- Audio packs in `public/sounds/`
- Lyrics & collaborators when API fields ship

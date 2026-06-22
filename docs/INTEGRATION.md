# DEX integration guide

## Current architecture

DEX is dependency-free HTML, CSS and JavaScript. That makes it easy to embed in an existing application without committing to a framework.

## Option 1 — embed as an isolated experience

Host the `public` directory and open DEX at a route such as `/dex`. This is the fastest path and preserves all visual effects.

## Option 2 — iframe integration

Deploy the `public` directory separately and embed it:

```html
<iframe
  src="/dex/"
  title="DEX"
  style="width:100%;height:100%;border:0"
></iframe>
```

Use `window.postMessage` later for authentication, profile data and navigation events.

## Option 3 — convert into framework components

For React/Next.js:

1. Move the markup inside `index.html` into React components.
2. Keep `styles.css` as a global stylesheet initially.
3. Move module and node data from `app.js` into JSON/API responses.
4. Replace DOM event handlers with component state.
5. Mount the experience at `/dex` or inside a modal/device shell.

Recommended component boundaries:

- `DexLauncher`
- `DexBootSequence`
- `DexDeviceShell`
- `DexHome`
- `DexRoleArtifact`
- `DexRolePopup`
- `DexEcosystemMap`
- `DexBottomDock`

## API-ready data

The first backend integration should replace these hard-coded objects in `public/app.js`:

- `moduleData`
- `nodeData`
- user name, rank, level and XP
- recent signals

Keep the visual layer independent from authentication and database logic. Pass a normalized DEX profile object into the interface.

## Production notes

- Self-host the Google fonts or replace the external `@import`.
- Version the service-worker cache whenever assets change.
- Add a Content Security Policy.
- Use real route and API error states.
- Add analytics only after defining privacy requirements.

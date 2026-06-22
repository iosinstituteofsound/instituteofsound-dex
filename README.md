# DEX

DEX is a mobile-shaped futuristic knowledge interface for Institute of Sound.

## Run locally

No dependency installation is required. Node.js is the only runtime.

```bash
cd ~/Documents/DEX
npm start
```

Open <http://127.0.0.1:4173>.

For a browser window that opens automatically:

```bash
npm run dev
```

## Open the Mac app

DEX is installed at:

```text
~/Applications/DEX.app
```

DEX launches as a draggable floating cube. Click the cube to morph it into the full interface. Press `Esc` to collapse it back into the floating icon.

The native app reads the editable source from `~/Documents/DEX/public`, so changes appear after pressing `Cmd+R` in expanded DEX.

## Edit with Cursor

```bash
cursor ~/Documents/DEX
```

If the `cursor` shell command is not installed, open Cursor and choose **File → Open Folder**, then select `Documents/DEX`.

Core files:

- `public/index.html` — interface structure and copy
- `public/styles.css` — visual system, responsive layout, effects and animations
- `public/app.js` — launch flow, navigation, popups, map and interactions
- `public/manifest.webmanifest` — installable web app metadata
- `macos/DEXApp.swift` — native Mac window wrapper

## Reinstall the native launcher

Usually unnecessary because the Mac app reads the live source. Reinstall only after editing native Swift code or the app icon:

```bash
npm run install:mac
```

See [`docs/INTEGRATION.md`](docs/INTEGRATION.md) for integration paths.

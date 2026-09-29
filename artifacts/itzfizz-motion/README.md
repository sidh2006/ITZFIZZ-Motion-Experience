# ITZFIZZ Motion

An editorial, scroll-controlled automotive landing experience for ITZFIZZ — a creative technology studio working where design, motion, and performance meet.

## Local development

From the workspace root:

```bash
pnpm --dir artifacts/itzfizz-motion install
PORT=5173 BASE_PATH=/ pnpm --dir artifacts/itzfizz-motion dev
```

Open `http://localhost:5173/`.

The artifact uses the workspace Vite configuration, so `PORT` and `BASE_PATH` are required. For a different local port, set both values together:

```bash
PORT=4173 BASE_PATH=/ pnpm --dir artifacts/itzfizz-motion dev
```

## Build and preview

```bash
PORT=5173 BASE_PATH=/ pnpm --dir artifacts/itzfizz-motion build
PORT=5173 BASE_PATH=/ pnpm --dir artifacts/itzfizz-motion serve
```

## GitHub Pages

Set `BASE_PATH` to the repository name (including the leading slash) when building:

```bash
PORT=5173 BASE_PATH=/your-repository-name pnpm --dir artifacts/itzfizz-motion build
```

Publish `artifacts/itzfizz-motion/dist/public` as the Pages artifact. The Vite base path is respected by the app and the generated car asset is bundled with the build.

## Interaction notes

- The pinned hero scene is driven by GSAP and ScrollTrigger. The vehicle path, scale, and rotation are scrubbed to the scroll position and reverse naturally when scrolling back.
- A reduced-motion preference bypasses the scrubbed scene and keeps all content readable in its resting state.
- The metrics are intentionally labeled as illustrative studio signals, not claimed business outcomes.
# MGLabs v28 — Clean Studio

## Major changes
- Removed all games and playable content from the project package.
- Removed Arcade, Multiplayer, Retro Vault, Play, Eaglercraft, LifeSim, Gridiron, Remix Vault and related playable assets.
- Simplified the header to compact grouped navigation:
  - Home
  - Learn
  - Build
  - Explore
  - More
  - Settings
- No horizontally scrolling mega-header.
- Added 20 additional animated atmosphere themes.
- Preserved existing cinematic theme system and Reduced Motion support.
- Updated Cloudflare Worker deployment:
  - `main = "./worker/index.js"`
  - ASSETS binding
  - SPA fallback
  - `/api/*` Worker-first routing
  - `AI_toliet` binding
  - Observability logs enabled
- Removed conflicting `public/_redirects`.

## Cloudflare build settings
Build command: `npm run build`
Deploy command: `npx wrangler deploy`
Root directory: `/`

# MGLabs Version 22 — Cloudflare Pages Setup

## Build settings
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: leave blank
- Node: 20

## SPA routing
This package includes `public/_redirects` with `/* /index.html 200`, so direct links such as `/brightpath`, `/games`, `/projectforge`, and `/settings` load correctly on Cloudflare Pages.

## Real AI
BrightPath and CodeCoach call `/api/ai`. The endpoint lives in `functions/api/ai.js` and uses Cloudflare Workers AI.

In Cloudflare Pages, create an AI binding named exactly `AI` for the project. If you deploy with Wrangler, `wrangler.toml` already declares the binding.

If the AI binding is missing, the website stays usable and shows an honest setup message instead of pretending AI worked.

## Domain
Set the custom domain to `mglabs.xyz` in Cloudflare Pages after the initial `pages.dev` deployment works.

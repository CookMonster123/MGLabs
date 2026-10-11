# MGLabs Version 22 — Cloudflare Workers Build Setup

This package is configured for the **Cloudflare Workers + Static Assets** project type currently used by MGLabs.

## Cloudflare Build configuration

Use these exact fields:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Version command:** `npx wrangler versions upload`
- **Root directory:** leave blank

The included `wrangler.toml` now contains a real Worker entry point plus the Vite `dist` asset directory, so `wrangler deploy` has both code and static assets to deploy.

## What the Worker does

- `/api/ai` is handled by `worker/index.js`.
- The `AI_toliet` binding is used only when it is actually configured.
- All other requests are delegated to the `ASSETS` binding.
- Direct routes such as `/games`, `/projectforge`, and `/settings` use SPA fallback to `index.html`.
- Observability logs are enabled.

## Required binding

In Cloudflare, add a Workers AI binding named exactly:

`AI_toliet`

If it is missing, BrightPath and CodeCoach show an honest unavailable message instead of inventing a reply.

## Custom domain

After a successful deployment, connect `mglabs.xyz` from the Worker's **Domains** tab. Remove old Netlify/GitHub website DNS records after the Cloudflare domain is active.

## Optional Pages compatibility

`wrangler.pages.toml` and `functions/api/ai.js` are retained as a fallback if MGLabs is later moved to a classic Cloudflare Pages project.

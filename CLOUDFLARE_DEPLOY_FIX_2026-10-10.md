# Cloudflare deploy fix — 2026-10-10

Use these Cloudflare build settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The conflicting `public/_redirects` file was removed.

SPA fallback is already handled in `wrangler.toml` with `not_found_handling = "single-page-application"`.

Workers AI remains configured with the binding `AI_toliet`.

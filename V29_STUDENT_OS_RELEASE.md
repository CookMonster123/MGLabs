# MGLabs v29 — Student OS

## Major systems added
- Smart Home briefing with live local task/project/recent counts
- Workspace presets: Study, Developer, Creative, Career
- Customizable dashboard widgets
- Quick Create for tasks, projects, notes, and study sessions
- Focus Mode with distraction-free timer
- Persistent right-side MGLabs Copilot/context panel
- Universal command palette and global search kept at the system level
- Favorites and recent items integrated into Smart Home
- Automatic time-of-day atmosphere selection
- Compact grouped navigation with no horizontal header scrolling
- Existing large animated theme library retained
- No game/playable sections or game catalogs

## Cloudflare deployment
- Build: `npm run build`
- Deploy: `npx wrangler deploy`
- Root directory: `/`
- Worker entry: `./worker/index.js`
- Static asset binding: `ASSETS`
- SPA fallback enabled
- Workers AI binding: `AI_toliet`
- Observability logs enabled

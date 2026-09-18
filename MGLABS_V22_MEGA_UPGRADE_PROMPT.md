# MGLabs Version 22 — Mega Upgrade Prompt

Take the existing MGLabs Version 22 project and improve it without redesigning it into a different product. Preserve the same dark futuristic MGLabs identity, familiar background style, app names, project areas, catalogs, themes, and navigation concepts, but make every implementation more reliable, polished, connected, and production-ready.

## Non-negotiable goals
1. Keep the project branded as MGLabs Version 22.
2. Preserve the same overall visual language: dark navy/black background, glass-like panels, teal/green + electric blue accents, rounded cards, subtle glow, strong typography, smooth animations. Improve spacing, responsiveness, contrast, hover states, loading states, and accessibility instead of replacing the style.
3. Every major section must have a real browser URL path that can be opened, refreshed, bookmarked, shared, and navigated with Back/Forward. Required routes include `/`, `/launchpad`, `/apps`, `/games`, `/multiplayer`, `/retro-vault`, `/play`, `/brightpath`, `/codecoach`, `/projectforge`, `/device-lab`, `/community`, `/careerquest`, `/portfolio`, `/school-tools`, `/creative-lab`, `/store`, `/developer`, and `/settings`.
4. Configure Cloudflare Pages SPA routing so direct visits to every route work.
5. Do not create fake functionality. If a feature is not implemented, mark it Prototype or Planned.

## AI requirements
Make MGLabs AI features use one real server endpoint instead of hard-coded fake replies. BrightPath and CodeCoach should call `/api/ai`. On Cloudflare, connect this endpoint to a Workers AI binding named `AI`. Include loading, error, retry, and unavailable states. Never claim an AI response succeeded if the backend failed. Do not expose API keys in client code. BrightPath should send its current subject and tutor mode as system context. CodeCoach should send the current code and ask for beginner-friendly explanations without executing unsafe code.

## Games requirements
Keep the full Mega Arcade catalog and all existing metadata. Do not pretend every catalog item is built. Preserve Built, Prototype, Planned, and External/Open Source statuses. Every Built game must actually open and be playable. Keep Metro Rush and Voxel Frontier and add reliable original browser games such as Reaction Grid, Number Sprint, and Memory Match. Store personal bests locally where relevant. External/Open Source entries should only show Play when a real legal play URL exists. Planned games should never show a fake Play button.

## Projects and data
Keep ProjectForge and all existing MGLabs project concepts. Preserve local data where it already exists. Improve project creation, milestone storage, Kanban state, completion progress, and honest project-health calculation. Never invent project completion or analytics data.

## Themes
Keep Dark and Light, and add polished MGLabs variants such as Neon, Ocean, Sunset, and Forest. All themes must reuse the same component system rather than becoming separate redesigns. Persist the selected theme. Keep compact mode and accessibility options.

## Core modules to preserve and improve
Home, Launchpad, Apps, Mega Arcade, Multiplayer Hub, Retro Vault, MGLabs Originals, BrightPath, CodeCoach, ProjectForge, Device Lab, Community, CareerQuest, Portfolio Builder, School Tools, Creative Lab, Labs Store, Developer Mode, Settings, search, favorites, recent activity, achievements, XP concepts, Daily Challenge, Weekly Quests, Game of the Day, Hidden Gems, New This Week, Surprise Me, collections, personal bests, profile badges, homepage widgets, and MGLabs Pulse.

## Reliability rules
- No fake AI.
- No fake multiplayer rooms or player counts.
- No fake users.
- No fake analytics.
- No fake payments.
- No fake email delivery.
- No fake hardware connection.
- No school/network bypass tools.
- No copyrighted commercial-game mirroring.
- Preserve open-source attribution and license information.
- Empty states should say there is no data yet instead of fabricating examples that look real.

## Cloudflare deployment
Use Vite build command `npm run build`, output `dist`, root directory blank, Node 20. Include Cloudflare Pages Functions for server functionality and `public/_redirects` for SPA fallback. The production custom domain will be `mglabs.xyz`. Remove GitHub Pages-specific CNAME/404 hacks from the Cloudflare package.

## Final quality bar
The result should feel like the same MGLabs the user already built, only significantly more reliable and polished. A student should be able to open any major page directly, use the themes, create and save local projects, play every Built game, use BrightPath/CodeCoach AI when the Cloudflare AI binding is enabled, refresh without losing navigation, and clearly understand which features are real versus planned.

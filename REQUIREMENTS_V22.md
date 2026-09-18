# MGLabs Version 22 — Release Requirements

MGLabs must:
- build as the existing React/Vite application,
- preserve the dark MGLabs tech style and six themes,
- support direct Cloudflare routes for all major pages,
- keep Metro Rush, Voxel Frontier, Reaction Grid, Number Sprint, and Memory Match wired as built games,
- use `/api/ai` for BrightPath and CodeCoach,
- require the Cloudflare Workers AI binding named `AI`,
- return errors instead of fake AI answers when AI is unavailable,
- keep ProjectForge/local tools honest and persistent,
- label Device Lab as Simulation Mode and support CSV export,
- make Creative Lab controls perform real local actions,
- never fabricate live users, analytics, payments, multiplayer rooms, or physical hardware,
- include Cloudflare SPA routing and security headers.

Release gate:
1. `npm run test:requirements`
2. `npm install`
3. `npm run typecheck`
4. `npm run build`
5. Browser smoke test on desktop and mobile.

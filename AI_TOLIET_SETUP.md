# MGLabs Workers AI setup — `AI_toliet`

MGLabs now expects the Cloudflare Workers AI binding to be named exactly **`AI_toliet`**.

## What is already wired

- Frontend AI tools call `POST /api/ai`.
- `worker/index.js` handles `/api/ai`.
- The Worker reads `env.AI_toliet`.
- `wrangler.toml` declares:

```toml
[ai]
binding = "AI_toliet"
```

## Cloudflare setup

### If deploying with Wrangler

1. Open this project in a terminal.
2. Run `npm install`.
3. Run `npm run build`.
4. Sign in to Cloudflare with `npx wrangler login` if needed.
5. Deploy with `npm run deploy:worker` (which runs `wrangler deploy`).

Wrangler reads the `[ai]` section and exposes Workers AI to the Worker as `env.AI_toliet`.

### If editing the binding in the Cloudflare dashboard

1. Open **Workers & Pages** in Cloudflare.
2. Open the **mglabs** Worker.
3. Open **Settings → Bindings** (the wording may appear as Variables and Bindings).
4. Add a **Workers AI** binding.
5. Set the variable/binding name to exactly `AI_toliet`.
6. Save and redeploy.

Do not name it `AI`, `AI_TOILET`, or anything else unless the source code and Wrangler config are changed to match.

## Endpoint behavior

The browser sends requests to:

```text
POST /api/ai
```

The Worker runs the model through:

```js
env.AI_toliet.run('@cf/meta/llama-3.1-8b-instruct', ...)
```

No API key is placed in browser code.

## Test it

After deploying, open BrightPath or CodeCoach and send a short prompt. If the binding is missing, MGLabs returns a 503 error instead of pretending AI worked.

You can also run the local verification scripts:

```bash
npm run test:requirements
npm run test:worker
```

# Free public deployment with Cloudflare Workers AI

This project supports two modes:

1. **Local:** Ollama runs on your Mac and Open WebUI runs in Docker at `http://localhost:3015`.
2. **Public:** Cloudflare Workers serves the static chat UI and calls Workers AI.

Cloudflare Workers AI currently includes a free allocation of 10,000 neurons per day on the Workers Free plan. Static assets are free to serve. See the official pricing documentation before deploying because limits and model availability can change.

The public demo uses:

```text
@cf/meta/llama-3.2-3b-instruct
```

## Deploy

### 1. Create/sign in to Cloudflare

Use the Cloudflare dashboard and make sure Workers AI is enabled for your account.

### 2. Install Wrangler

```bash
npm install -g wrangler
```

Or use it without a global install:

```bash
npx wrangler login
```

### 3. Login

```bash
npx wrangler login
```

A browser window will open for authorization.

### 4. From this repository

```bash
cd local-ollama
npx wrangler deploy
```

Wrangler reads `wrangler.jsonc`, uploads `public/`, and deploys `src/index.js` with the Workers AI binding.

### 5. Open the generated URL

Wrangler will print a `workers.dev` URL after deployment.

## Important free-tier note

Workers AI is not unlimited. The Workers Free plan currently includes 10,000 AI neurons per day. If the daily allocation is exceeded, requests can fail until the allocation resets. Do not add a payment method or upgrade the account if your goal is strictly ₹0 cost.

## Security note

The demo endpoint is intentionally simple and does not include user authentication. A public AI endpoint can be abused and consume the account's daily free allocation. For a portfolio demo, consider adding authentication/rate limiting before sharing the URL widely.

## Local mode is unchanged

The public Worker does not access your Mac. Your local Ollama model remains private and continues to run through Open WebUI.

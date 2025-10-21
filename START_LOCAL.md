# Start the App Locally

This project is a Next.js 14 (App Router) + TypeScript + Tailwind app.

## Prerequisites
- Node.js 20.x (LTS) — check with `node -v`
- pnpm 9.x — install with `npm i -g pnpm`
- (Optional) Redis URL if you want rate limiting and caching beyond in-memory

## 1) Clone & Install
git clone <YOUR_REPO_URL>.git
cd <YOUR_REPO_NAME>
pnpm install

## 2) Environment Variables
Copy the example and fill in values you have:
cp .env.example .env.local

Required (typical):
- RATE_LIMIT= # leave empty to disable limiter locally, e.g., "100/m"
- REDIS_URL=  # optional; if not set, in-memory cache/limiter is used
- SOURCE_LITURGICAL_API_URL=
- SOURCE_READINGS_BASE_URL=
- SOURCE_SAINTS_BASE_URL=
- SOURCE_HOURS_BASE_URL=
- (Optional) SENTRY_DSN=

> The app validates env on boot; missing critical variables will be reported with a clear error.

## 3) Run in Development
pnpm dev
# App will be available at http://localhost:3000

## 4) Useful Scripts
- `pnpm lint`       # ESLint checks
- `pnpm typecheck`  # TypeScript checks
- `pnpm test`       # Unit tests (Vitest)
- `pnpm test:e2e`   # E2E tests (Playwright)
- `pnpm build`      # Production build
- `pnpm start`      # Start built app locally

## 5) Seed / Demo Data (Optional)
Some widgets can render without external sources. Check `/data/*` for sample quotes, catechism snippets, and novena templates.

## 6) Cron Prewarmer (Optional)
If you want to simulate the daily prewarm locally:
curl -sS http://localhost:3000/api/cron/prewarm

## 7) Troubleshooting
- **Build fails**: run `pnpm typecheck` and `pnpm lint` for details.
- **ENV errors**: ensure `.env.local` exists and matches `.env.example`.
- **Content restricted**: certain sources may be link-only. This is expected. The UI will show references and our own reflections.
- **Rate limiting**: disable locally by removing `RATE_LIMIT` or set a high value.
- **Port in use**: change the port `pnpm start -p 3001` or set `PORT=3001` before `pnpm dev`.

## 8) Next Steps (Production)
- Push to a GitHub repo and import into Vercel.
- Add Env Vars in Vercel Project Settings (match `.env.example`).
- Add a Vercel Cron Job to hit `/api/cron/prewarm` daily.
- Wait for Preview Deployment checks to pass; then promote to Production.

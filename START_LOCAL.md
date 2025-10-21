# Start the App Locally

This project is a Next.js 14 (App Router) + TypeScript + Tailwind app.

## Prerequisites
- Node.js 20.x (LTS) — check with `node -v`
- (Optional) Redis URL if you want rate limiting and caching beyond in-memory

## 1) Clone & Install
git clone <YOUR_REPO_URL>.git
cd <YOUR_REPO_NAME>
npm ci

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
npm run dev
# App will be available at http://localhost:3000

## 4) Useful Scripts
- `npm run lint`       # ESLint checks
- `npm run typecheck`  # TypeScript checks
- `npm test`           # Unit tests (Vitest)
- `npm run test:e2e`   # E2E tests (Playwright)
- `npm run build`      # Production build
- `npm start`          # Start built app locally

## 5) Seed / Demo Data (Optional)
Some widgets can render without external sources. Check `/data/*` for sample quotes, catechism snippets, and novena templates.

## 6) Cron Prewarmer (Optional)
If you want to simulate the daily prewarm locally:
curl -sS http://localhost:3000/api/cron/prewarm

## 7) Troubleshooting
- **Build fails**: run `npm run typecheck` and `npm run lint` for details.
- **ENV errors**: ensure `.env.local` exists and matches `.env.example`.
- **Content restricted**: certain sources may be link-only. This is expected. The UI will show references and our own reflections.
- **Rate limiting**: disable locally by removing `RATE_LIMIT` or set a high value.
- **Port in use**: change the port `npm start -p 3001` or set `PORT=3001` before `npm run dev`.

## 8) Next Steps (Production)
- Push to a GitHub repo and import into Vercel.
- Add Env Vars in Vercel Project Settings (match `.env.example`).
- Add a Vercel Cron Job to hit `/api/cron/prewarm` daily.
- Wait for Preview Deployment checks to pass; then promote to Production.


---

## Contributing: Line Endings & Husky

This repo is line-ending safe across Windows, WSL, and macOS.

- .gitattributes enforces LF for shell files, Husky hooks, and common text files (`*.md`, `*.json`); CRLF for Windows scripts (.bat/.cmd/.ps1); auto for everything else.
- .editorconfig guides editors to use LF by default and CRLF for Windows-native scripts.

If you see line-ending warnings after a pull, renormalize the index:

```
git add --renormalize .
git commit -m "chore: renormalize line endings"
```

Recommended repo-scoped Git settings (run once):

```
git config core.autocrlf input
git config core.eol lf
git config core.safecrlf warn
```

Ensure hooks are executable (Unix shells):

```
git update-index --chmod=+x .husky/pre-push
# If you add more shell scripts:
# git update-index --chmod=+x scripts/local-smoke.sh
```

Windows tips:
- Prefer editing via WSL or ensure your editor honors .editorconfig.
- Even with global core.autocrlf=true, .gitattributes will force LF for Husky hooks and *.sh files.

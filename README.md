# Catholic Daily Hub

A production-ready Next.js 14 (App Router) + TypeScript + Tailwind web app that aggregates daily Catholic content with graceful fallbacks. Deploy-ready for Vercel.

## Getting Started

Prereqs: Node 20+, npm (pnpm optional)

1. Install dependencies

   npm ci

2. Copy env and adjust as needed

   cp .env.example .env.local

3. Run the dev server

   npm run dev

4. Open http://localhost:3000

## Environment Variables

Copy .env.example to .env.local and set values for your environment:

- RATE_LIMIT=          # e.g., "100/m" to enable API rate limiting (optional)
- REDIS_URL=           # optional; enables shared cache/limiter
- SOURCE_LITURGICAL_API_URL=
- SOURCE_READINGS_BASE_URL=https://bible.usccb.org
- SOURCE_SAINTS_BASE_URL=
- SOURCE_HOURS_BASE_URL=https://universalis.com
- SENTRY_DSN=          # optional

## Deploy to Vercel

- Push this repo to GitHub and import into Vercel.
- Set Environment Variables from .env.example as needed.
- Build Command: npm ci && npm run build
- Output: .next

### Vercel Cron Setup

Configure a cron job in Vercel to prewarm cache daily.

- Go to: Project Settings → Functions → Cron Jobs → Add Cron Job
- Schedule: 5 0 * * *
- Endpoint: /api/cron/prewarm

Example screenshot steps:
1. Click Add Cron Job
2. Enter Schedule: `5 0 * * *`
3. Select Environment: Production
4. Enter Path: `/api/cron/prewarm`
5. Save

## Licensing & Sources

- This application does not republish restricted content. When sources are restricted, we display references and link to the source, along with our original reflections.
- See `lib/config/sources.ts` and `lib/config/features.ts` for source toggles and feature flags.

## Tech Highlights

- Next.js 14 App Router, server components and route handlers
- Tailwind CSS + simple UI primitives compatible with shadcn patterns
- ISR and fetch cache with revalidate headers
- Adapters with graceful fallbacks and `restricted` flags
- PWA manifest and basic offline placeholder
- i18n with next-intl (English baseline)
- Zustand for lightweight preferences
- Vitest + RTL and Playwright smoke test
- GitHub Actions CI (lint, type-check, unit tests)

## Run Tests

- Unit/Component: npm test
- E2E: In one terminal run `npm run dev`, in another run `npm run test:e2e`

## Notes on Geo & Notifications

- Location features display external finder links only unless an API is integrated.
- Notifications for Angelus are local client reminders only when supported by the browser/PWA.


## CI & Tooling Notes

- shadcn-ui init is a local-only step and is not run automatically in CI. To scaffold components locally, run:

  npx shadcn-ui@latest init

- Husky is skipped in CI via a guard in the prepare script. Locally, hooks work as usual. To hard-skip Husky in CI environments (e.g., Vercel), set `HUSKY=0` in the project Environment Variables.
- Vercel build troubleshooting: if you encounter install/build failures, Clear Build Cache and Redeploy from the Vercel UI.


## Contributing: Line Endings & Husky

- Husky hooks and shell scripts use LF line endings and must be executable on Unix.
- This repo includes .gitattributes to enforce:
  - LF for `*.sh` and `.husky/*`
  - CRLF for Windows scripts (`*.bat`, `*.cmd`, `*.ps1`)
  - `text=auto` for everything else
- Editors are guided by `.editorconfig` to match these rules.

If you see line-ending warnings or churn after pulling, run:

```
git add --renormalize .
git commit -m "chore: renormalize line endings"
```

Recommended repo-scoped Git settings:

```
git config core.autocrlf input
git config core.eol lf
git config core.safecrlf warn
```

Ensure hooks are executable (if needed):

```
git update-index --chmod=+x .husky/pre-push
```

Windows users: Prefer editing via WSL or ensure your editor respects `.editorconfig`. Even with global `core.autocrlf=true`, `.gitattributes` forces LF for hooks.

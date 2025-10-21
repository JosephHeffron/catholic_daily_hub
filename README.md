# Catholic Daily Hub

A production-ready Next.js 14 (App Router) + TypeScript + Tailwind web app that aggregates daily Catholic content with graceful fallbacks. Deploy-ready for Vercel.

## Getting Started

Prereqs: Node 18+, pnpm

1. Install dependencies

   pnpm install

2. Copy env and adjust as needed

   cp .env.example .env.local

3. Run the dev server

   pnpm dev

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
- Build Command: pnpm install --frozen-lockfile && pnpm build
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

- Unit/Component: pnpm test
- E2E: In one terminal run `pnpm dev`, in another run `pnpm test:e2e`

## Notes on Geo & Notifications

- Location features display external finder links only unless an API is integrated.
- Notifications for Angelus are local client reminders only when supported by the browser/PWA.

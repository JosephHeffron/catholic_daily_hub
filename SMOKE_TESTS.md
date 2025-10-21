# Smoke Tests — Catholic Daily Hub

This document lists manual steps to quickly validate core flows. Use it before releases.

Environment: Node 20.x, pnpm 9.x, fresh build

Prereq:
- pnpm install
- cp .env.example .env.local (leave sources blank to test fallbacks)
- pnpm dev (or pnpm build && pnpm start)

## Homepage /
- Step: Open /
  - Expected: Cards visible — "Saint / Feast of the Day", "Mass Readings" (references + reflection), "Rosary Mystery Today", "Liturgy of the Hours", "On This Day in Church History", "Quote of the Day", "Daily Catechism Insight", "Novenas & Devotions".
  - Actual: ____
  - Result: PASS | FAIL
- Step: Ensure no errors in console
  - Expected: No uncaught errors; network requests succeed or are gracefully handled.
  - Actual: ____
  - Result: PASS | FAIL

## Date routing
- Step: Visit /calendar/2025/10/20
  - Expected: Date heading shows 2025-10-20; Rosary Mystery — Joyful; other cards render without crash.
  - Actual: ____
  - Result: PASS | FAIL

## Widgets
- Step: Visit /widgets
  - Expected: Compact widgets tiles are visible: Saint of the Day (Compact), Daily Gospel (Compact), Rosary Today, Liturgical Color Chip, Angelus Bell, History Today Tile.
  - Actual: ____
  - Result: PASS | FAIL

## Cron / cache
- Step: Call /api/cron/prewarm (browser or curl)
  - Expected: Returns 200 with JSON { ok: true, results: [...] }
  - Actual: ____
  - Result: PASS | FAIL

## Health page
- Step: Visit /health
  - Expected: Returns JSON with status per adapter: ok/degraded; if sources unconfigured, should not be 500.
  - Actual: ____
  - Result: PASS | FAIL

## Restricted content policy
- Step: Inspect Mass Readings card when canDisplayFullText=false
  - Expected: Shows references + our reflection + a source link; no full copyrighted text.
  - Actual: ____
  - Result: PASS | FAIL

## PWA
- Step: Chrome DevTools → Lighthouse → PWA
  - Expected: Manifest detected, icons present, service worker running; offline fallback works; no restricted content offline.
  - Actual: ____
  - Result: PASS | FAIL

## Accessibility
- Step: Lighthouse A11y
  - Expected: ≥ 95. Keyboard navigation works, visible focus, alt text present.
  - Actual: ____
  - Result: PASS | FAIL

## Performance
- Step: Lighthouse Performance (cold run on /)
  - Expected: ≥ 95; images lazy load; no oversized bundles.
  - Actual: ____
  - Result: PASS | FAIL

## Error handling
- Step: Break a source URL in .env.local and restart dev
  - Expected: Cards degrade gracefully with friendly messages; no unhandled rejections.
  - Actual: ____
  - Result: PASS | FAIL

## Dark mode / mobile
- Step: Enable OS dark mode; set mobile viewport
  - Expected: UI adapts; grid collapses to 1 column; tap targets usable.
  - Actual: ____
  - Result: PASS | FAIL

## SEO basics
- Step: Verify titles/metadata and OpenGraph image route (if implemented)
  - Expected: Titles present per page; OG endpoint responds.
  - Actual: ____
  - Result: PASS | FAIL

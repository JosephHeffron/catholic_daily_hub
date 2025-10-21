# QA Verification Report — Catholic Daily Hub

Date: 2025-10-20
Prepared by: Release QA

## Environment
- OS: __________
- Node: __________ (target 20.x)
- pnpm: __________ (target 9.x)
- Browser(s): Chrome ______, Edge ______

## Commands Executed
1. npm ci
2. cp .env.example .env.local
3. npm run lint
4. npm run typecheck
5. npm run build
6. npm start -p 3000
7. scripts/local-smoke.sh
8. npm test
9. npm run dev (in another terminal) + npm run test:e2e

## Automated Results
- Lint: PASS | FAIL
- Typecheck: PASS | FAIL
- Unit tests: PASS | FAIL (# of tests: __ / __)
- E2E tests: PASS | FAIL (# of tests: __ / __)

## Manual Smoke (see SMOKE_TESTS.md)
Summary table:
- Homepage /: PASS | FAIL — Notes: ______________________
- Calendar /calendar/2025/10/20: PASS | FAIL — Notes: ______________________
- Widgets /widgets: PASS | FAIL — Notes: ______________________
- Health /health: PASS | FAIL — Notes: ______________________
- Cron /api/cron/prewarm: PASS | FAIL — Notes: ______________________
- Restricted policy: PASS | FAIL — Notes: ______________________
- PWA/Lighthouse: PASS | FAIL — Perf: __ A11y: __ SEO: __ Best: __ — Notes: ______________________
- Error handling: PASS | FAIL — Notes: ______________________
- Dark mode/mobile: PASS | FAIL — Notes: ______________________
- SEO basics: PASS | FAIL — Notes: ______________________

## Artifacts
- START_LOCAL.md: Verified (Y/N)
- SMOKE_TESTS.md: Created (Y/N)
- Screenshots: (optional) links here

## Known Issues / Mitigations
- Issue: _________________________
  - Impact: Low | Medium | High
  - Mitigation: _________________________

## Conclusion
Overall readiness: Ready | Ready with low-risk exceptions | Not ready

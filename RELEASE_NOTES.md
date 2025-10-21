### Release Notes — Production Hardening, Docs, and Release Gating

PR Title: chore: production hardening, docs, and release gating

#### Summary
- Hardened Next.js config with CSP and common security headers.
- Added API rate limiting middleware (in-memory with optional Redis) gated by RATE_LIMIT.
- Introduced Zod-based env validation and documented env vars.
- Added /health JSON endpoint and /widgets page scaffold.
- Added sitemap and robots, PWA manifest.
- CI workflow for lint, typecheck, and unit tests; Husky pre-push hook to gate local pushes.
- Documentation: START_LOCAL.md, SECURITY.md, updated README.

#### Before / After Checklist
- Build scripts: MISMATCH ➜ NOW aligned (dev, build, start, lint, typecheck, format, test, test:unit, test:e2e, prepare).
- Security headers: MISSING ➜ NOW enforced globally (CSP, XFO, XCTO, Referrer-Policy, Permissions-Policy).
- Rate limiting: MISSING ➜ AVAILABLE (opt-in via RATE_LIMIT; Redis-supported).
- Env validation: MISSING ➜ PRESENT (Zod); clear errors on misconfig.
- PWA manifest: REFERENCED ONLY ➜ PRESENT (manifest.webmanifest).
- Robots/Sitemap: MISSING ➜ PRESENT (basic coverage).
- Health endpoint: MISSING ➜ PRESENT (/health returns adapter statuses).
- Widgets page: MISSING ➜ PRESENT (scaffold).
- CI: PARTIAL/UNSPECIFIED ➜ PRESENT (GitHub Actions workflow on PR).
- Pre-push gates: MISSING ➜ PRESENT (husky pre-push).
- Docs: BASIC ➜ EXPANDED (env, local start guide, security, release notes).

#### Residual Risks / Follow-ups
- Icons for PWA are referenced but sample PNGs are not included (provide real icons under public/icons/* before launch).
- A11y automated checks (axe) not wired to CI; manual checks recommended and can be added later.
- Optional Sentry not wired; DSN flag present in env schema.
- Dependency audit not automated; run `pnpm audit` periodically and upgrade as needed.
- Some adapters are placeholders and marked restricted; ensure licensing compliance with real sources.

#### Migration / Ops Notes
- Set RATE_LIMIT in Production to mitigate abusive traffic (e.g., 300/m).
- Provide REDIS_URL for distributed rate limiting and caching if running on multiple instances.
- Configure Vercel Cron to call /api/cron/prewarm daily at 00:05 (documented in README).

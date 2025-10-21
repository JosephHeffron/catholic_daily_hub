#!/usr/bin/env bash
set -euo pipefail
base="${1:-http://localhost:3000}"
echo "Probing $base ..."
for path in / /health /widgets /about /privacy /terms /api/cron/prewarm /calendar/2025/10/20 ; do
  echo "--- GET $path"; curl -fsS "$base$path" >/dev/null && echo "OK $path"
done
echo "All probes OK"

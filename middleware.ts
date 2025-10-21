import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

// Simple token bucket / fixed window hybrid per-IP for /api/*
// Enabled only when RATE_LIMIT is set (e.g., "100/m" or "100/60s").
// Optional Redis via REDIS_URL for multi-instance coherence; otherwise in-memory Map.

const rate = process.env.RATE_LIMIT || ''
let redis: Redis | undefined
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    } as any)
  }
} catch {}

const memory = new Map<string, { count: number; reset: number }>()

function parseRate(input: string): { limit: number; windowMs: number } | null {
  if (!input) return null
  // Accept forms: "100/m", "100/60s", "100/3600", "100 per minute" (basic)
  const m = input.trim().match(/(\d+)\s*\/?\s*(\d+)?\s*(s|m|h)?/i)
  if (!m) return null
  const limit = Number(m[1])
  let windowMs = 60000 // default minute
  if (m[2]) {
    const qty = Number(m[2])
    const unit = (m[3] || 's').toLowerCase()
    if (m[3]) {
      windowMs = unit === 'h' ? qty * 3600000 : unit === 'm' ? qty * 60000 : qty * 1000
    } else {
      // If only a number provided as denominator, treat as seconds
      windowMs = qty * 1000
    }
  } else if (m[3]) {
    const unit = m[3].toLowerCase()
    windowMs = unit === 'h' ? 3600000 : unit === 'm' ? 60000 : 1000
  }
  return { limit, windowMs }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!rate) return NextResponse.next() // disabled
  if (!pathname.startsWith('/api/')) return NextResponse.next()

  const cfg = parseRate(rate)
  if (!cfg) {
    // Fail closed if misconfigured to avoid abuse
    return new NextResponse(JSON.stringify({ error: 'Rate limiter misconfigured' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    })
  }

  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const key = `rl:${ip}`
  const now = Date.now()

  if (redis) {
    try {
      const bucketKey = `${key}:${Math.floor(now / cfg.windowMs)}`
      const count = (await redis.incr(bucketKey as any)) as unknown as number
      if (count === 1) await redis.pexpire(bucketKey as any, cfg.windowMs as any)
      if (count > cfg.limit) {
        return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
          status: 429,
          headers: { 'content-type': 'application/json' },
        })
      }
      return NextResponse.next()
    } catch {
      // If Redis errors, fall back to memory limiter
    }
  }

  const rec = memory.get(key)
  if (!rec || rec.reset < now) {
    memory.set(key, { count: 1, reset: now + cfg.windowMs })
    return NextResponse.next()
  }
  if (rec.count >= cfg.limit) {
    return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    })
  }
  rec.count += 1
  memory.set(key, rec)
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}

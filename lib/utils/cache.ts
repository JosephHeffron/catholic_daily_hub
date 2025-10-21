import { Redis } from '@upstash/redis'

let redis: Redis | undefined
try {
  // Prefer standard Upstash REST env vars if provided
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    } as any)
  }
  // Otherwise, leave undefined to use in-memory cache
} catch {}

const memory = new Map<string, { value: unknown; exp: number }>()

export async function cacheGet<T>(key: string): Promise<T | null> {
  const now = Date.now()
  const inMem = memory.get(key)
  if (inMem && inMem.exp > now) return inMem.value as T
  if (redis) {
    try {
      const v = await redis.get<T>(key as any)
      if (v) return v
    } catch {}
  }
  return null
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds: number) {
  const exp = Date.now() + ttlSeconds * 1000
  memory.set(key, { value, exp })
  if (redis) {
    try {
      await redis.set(key as any, value as any, { ex: ttlSeconds } as any)
    } catch {}
  }
}

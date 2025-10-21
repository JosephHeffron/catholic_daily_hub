import { Redis } from '@upstash/redis'

const redisUrl = process.env.REDIS_URL
let redis: Redis | undefined
if (redisUrl) {
  try {
    redis = new Redis({ url: redisUrl }) as unknown as Redis
  } catch {}
}

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

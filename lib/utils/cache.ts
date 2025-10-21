// Lazy optional Redis import to avoid breaking runtime when module/env is unavailable
let redis: any | undefined

async function ensureRedis() {
  if (redis !== undefined) return
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    redis = null
    return
  }
  try {
    const mod = await import('@upstash/redis') as any
    const R = (mod.Redis || mod.default?.Redis || mod.default)
    if (R) {
      // eslint-disable-next-line new-cap
      redis = new R({ url, token } as any)
    } else {
      redis = null
    }
  } catch {
    redis = null
  }
}

const memory = new Map<string, { value: unknown; exp: number }>()

export async function cacheGet<T>(key: string): Promise<T | null> {
  const now = Date.now()
  const inMem = memory.get(key)
  if (inMem && inMem.exp > now) return inMem.value as T
  await ensureRedis()
  if (redis) {
    try {
      const v = await redis.get(key as any) as T | null
      if (v) return v
    } catch {}
  }
  return null
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds: number) {
  const exp = Date.now() + ttlSeconds * 1000
  memory.set(key, { value, exp })
  await ensureRedis()
  if (redis) {
    try {
      await redis.set(key as any, value as any, { ex: ttlSeconds } as any)
    } catch {}
  }
}

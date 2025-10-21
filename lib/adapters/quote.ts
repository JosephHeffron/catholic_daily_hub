import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'
import type { TodayBundle } from '@/lib/types'
import quotes from '@/data/quotes.json'

const TTL = 3600

export async function getByDate(date: Date): Promise<{ text: string; author: string; source?: string }> {
  const key = `quote:${toISODate(date)}`
  const cached = await cacheGet<{ text: string; author: string; source?: string }>(key)
  if (cached) return cached

  const idx = Math.abs(hash(toISODate(date))) % quotes.length
  const picked = quotes[idx]

  await cacheSet(key, picked, TTL)
  return picked
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return h
}

import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'

const TTL = 3600

type Catechism = { paragraph: string; number?: string; source?: string; restricted?: boolean }

import entries from '@/data/catechism.json'

export async function getByDate(date: Date): Promise<Catechism> {
  const key = `catechism:${toISODate(date)}`
  const cached = await cacheGet<Catechism>(key)
  if (cached) return cached

  const idx = Math.abs(hash(toISODate(date))) % entries.length
  const picked = entries[idx]

  await cacheSet(key, picked, TTL)
  return picked
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return h
}

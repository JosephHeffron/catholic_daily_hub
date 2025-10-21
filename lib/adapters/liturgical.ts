import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { simpleLiturgicalDay } from '@/lib/utils/seasons'
import { toISODate } from '@/lib/utils/date'
import type { LiturgicalDay } from '@/lib/types'
import { features } from '@/lib/config/features'
import { sources } from '@/lib/config/sources'

const TTL = 3600 // 1 hour

export async function getByDate(date: Date): Promise<LiturgicalDay> {
  const key = `liturgical:${toISODate(date)}`
  const cached = await cacheGet<LiturgicalDay>(key)
  if (cached) return cached

  let data: LiturgicalDay
  try {
    if (features.sources.liturgical && sources.liturgicalApi) {
      const url = `${sources.liturgicalApi}?date=${toISODate(date)}`
      const res = await fetch(url, { next: { revalidate: TTL } })
      if (!res.ok) throw new Error('bad status')
      const json = await res.json()
      // Normalize minimal fields (example structure expected)
      data = {
        date: toISODate(date),
        season: json.season || 'Ordinary Time',
        week: json.week || undefined,
        rank: json.rank || 'feria',
        color: json.color || 'green',
        celebrations: (json.celebrations || []).map((c: any) => ({ title: String(c.title), type: c.type })),
      }
    } else {
      data = simpleLiturgicalDay(date)
    }
  } catch {
    data = { ...simpleLiturgicalDay(date), restricted: true }
  }

  await cacheSet(key, data, TTL)
  return data
}

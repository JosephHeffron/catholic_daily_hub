import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'
import type { HistoryEvent } from '@/lib/types'

const TTL = 3600

export async function getByDate(date: Date): Promise<HistoryEvent[]> {
  const key = `history:${toISODate(date)}`
  const cached = await cacheGet<HistoryEvent[]>(key)
  if (cached) return cached

  const events: HistoryEvent[] = [
    { year: 325, text: 'Council of Nicaea articulates the Creed of the Church.', link: 'https://www.newadvent.org/cathen/11044a.htm' },
  ]

  await cacheSet(key, events, TTL)
  return events
}

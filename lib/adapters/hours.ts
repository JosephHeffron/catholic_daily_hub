import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'
import type { HoursSummary } from '@/lib/types'
import { features } from '@/lib/config/features'
import { sources } from '@/lib/config/sources'

const TTL = 3600

export async function getByDate(date: Date): Promise<HoursSummary> {
  const key = `hours:${toISODate(date)}`
  const cached = await cacheGet<HoursSummary>(key)
  if (cached) return cached

  let data: HoursSummary
  try {
    if (features.sources.hours) {
      data = {
        date: toISODate(date),
        lauds: { title: 'Morning Prayer', psalms: ['Psalm 63'], antiphon: 'Come, let us adore.' },
        vespers: { title: 'Evening Prayer', psalms: ['Psalm 141'], antiphon: 'Let my prayer rise.' },
        audio: {
          lauds: `${sources.hoursBase}/lauds.mp3`,
          vespers: `${sources.hoursBase}/vespers.mp3`,
        },
        link: sources.hoursBase,
        restricted: true,
      }
    } else {
      data = {
        date: toISODate(date),
        link: sources.hoursBase || '#',
        restricted: true,
      }
    }
  } catch {
    data = { date: toISODate(date), restricted: true, link: sources.hoursBase || '#' }
  }

  await cacheSet(key, data, TTL)
  return data
}

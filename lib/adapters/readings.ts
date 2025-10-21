import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'
import type { MassReadings } from '@/lib/types'
import { features } from '@/lib/config/features'
import { sources } from '@/lib/config/sources'

const TTL = 3600

export async function getByDate(date: Date): Promise<MassReadings> {
  const key = `readings:${toISODate(date)}`
  const cached = await cacheGet<MassReadings>(key)
  if (cached) return cached

  let data: MassReadings
  try {
    if (features.sources.readings && sources.readingsBase) {
      // We do NOT fetch copyrighted full text. Provide references + link only and an original reflection.
      const link = `${sources.readingsBase}/daily-bible-reading`
      data = {
        date: toISODate(date),
        refs: [
          { kind: 'first', ref: 'Rom 8:26-30' },
          { kind: 'psalm', ref: 'Ps 13:6', refrain: 'I will sing to the Lord' },
          { kind: 'gospel', ref: 'Lk 1:46-55' },
        ],
        reflection:
          'Today we are invited to trust the quiet work of grace. God’s Spirit intercedes within our weakness, shaping our hearts to respond with Mary’s fiat—humble, attentive, and brave.',
        link,
        canDisplayFullText: false,
        restricted: true,
      }
    } else {
      data = {
        date: toISODate(date),
        refs: [
          { kind: 'first', ref: 'Reference unavailable' },
          { kind: 'psalm', ref: 'Reference unavailable' },
          { kind: 'gospel', ref: 'Reference unavailable' },
        ],
        reflection:
          'In the absence of source text, ponder the Gospel and ask for the grace to live today with faith, hope, and charity.',
        link: '#',
        canDisplayFullText: false,
        restricted: true,
      }
    }
  } catch {
    data = {
      date: toISODate(date),
      refs: [],
      reflection:
        'We could not load the readings at this time. Please try again later, and consider praying a decade of the Rosary as a simple offering.',
      link: '#',
      canDisplayFullText: false,
      restricted: true,
    }
  }

  await cacheSet(key, data, TTL)
  return data
}

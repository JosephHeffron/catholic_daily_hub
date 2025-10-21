import { cacheGet, cacheSet } from '@/lib/utils/cache'
import { toISODate } from '@/lib/utils/date'
import type { SaintDay } from '@/lib/types'
import { features } from '@/lib/config/features'
import { sources } from '@/lib/config/sources'

const TTL = 3600

export async function getByDate(date: Date): Promise<SaintDay[]> {
  const key = `saint:${toISODate(date)}`
  const cached = await cacheGet<SaintDay[]>(key)
  if (cached) return cached

  let saints: SaintDay[]
  try {
    if (features.sources.saints && sources.saintsBase) {
      // Placeholder normalization; we do not fetch restricted bios
      saints = [
        {
          date: toISODate(date),
          name: 'Blessed Example',
          bio: 'A brief, original summary honoring a saint who witnessed to Christ in daily life.',
          patronage: ['Holiness of daily work'],
          prayer: 'Lord, make us faithful in small things, for Your glory. Amen.',
          link: sources.saintsBase,
          restricted: false,
        },
      ]
    } else {
      saints = [
        {
          date: toISODate(date),
          name: 'A Saint for Today',
          bio: 'We honor a saint whose life points us to Jesus. May we imitate their charity and courage.',
          patronage: ['All the faithful'],
          prayer: 'Saints of God, pray for us.',
          link: '#',
          restricted: false,
        },
      ]
    }
  } catch {
    saints = [
      {
        date: toISODate(date),
        name: 'Saint information unavailable',
        bio: 'We could not load details at this time. Please check the source link for more.',
        link: '#',
        restricted: true,
      },
    ]
  }

  await cacheSet(key, saints, TTL)
  return saints
}

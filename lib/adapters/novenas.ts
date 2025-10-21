import { cacheGet, cacheSet } from '@/lib/utils/cache'

export type NovenaInstance = { name: string; day: number; link?: string }

type Devotions = { novenas: NovenaInstance[] }

const TTL = 3600

// Legacy shape returning an object
export async function getByDate(): Promise<Devotions> {
  const key = `novenas:sample`
  const cached = await cacheGet<Devotions>(key)
  if (cached) return cached

  const data: Devotions = {
    novenas: [{ name: 'Novena to the Sacred Heart', day: 3, link: '#' }],
  }
  await cacheSet(key, data, TTL)
  return data
}

// Preferred export used by pages/APIs: return array directly
export async function getActive(_date?: Date): Promise<NovenaInstance[]> {
  const key = `novenas:sample`
  const cached = await cacheGet<Devotions>(key)
  if (cached) return cached.novenas
  const data = await getByDate()
  return data.novenas
}

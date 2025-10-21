import { cacheGet, cacheSet } from '@/lib/utils/cache'

export type NovenaInstance = { name: string; day: number; link?: string }

type Devotions = { novenas: NovenaInstance[] }

const TTL = 3600

export async function getByDate(): Promise<Devotions> {
  // Novenas are client-driven schedules; on server we can return a sample active novena
  const key = `novenas:sample`
  const cached = await cacheGet<Devotions>(key)
  if (cached) return cached

  const data: Devotions = {
    novenas: [
      { name: 'Novena to the Sacred Heart', day: 3, link: '#' },
    ],
  }
  await cacheSet(key, data, TTL)
  return data
}

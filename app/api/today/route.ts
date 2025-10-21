import { NextResponse } from 'next/server'
import { getByDate as getLiturgical } from '@/lib/adapters/liturgical'
import { getByDate as getReadings } from '@/lib/adapters/readings'
import { getByDate as getSaint } from '@/lib/adapters/saint'
import { getByDate as getHours } from '@/lib/adapters/hours'
import { getByDate as getHistory } from '@/lib/adapters/history'
import { getByDate as getQuote } from '@/lib/adapters/quote'
import { getByDate as getCatechism } from '@/lib/adapters/catechism'
import { getActive as getNovenas } from '@/lib/adapters/novenas'
import { mysteriesForDate } from '@/lib/utils/rosary'
import { toISODate } from '@/lib/utils/date'
import type { TodayBundle } from '@/lib/types'

function parseDateFromRequest(req: Request): Date {
  const url = new URL(req.url)
  const d = url.searchParams.get('date')
  if (!d) return new Date()
  const parsed = new Date(d)
  if (isNaN(parsed.getTime())) return new Date()
  return parsed
}

export const revalidate = 900

export async function GET(req: Request) {
  const date = parseDateFromRequest(req)

  try {
    const [liturgical, readings, saints, hours, history, quote, catechism] = await Promise.all([
      getLiturgical(date),
      getReadings(date),
      getSaint(date),
      getHours(date),
      getHistory(date),
      getQuote(date),
      getCatechism(date)
    ])

    const rosary = mysteriesForDate(date)
    const novenas = await getNovenas(date)

    const bundle: TodayBundle = {
      liturgical,
      readings,
      saint: saints,
      rosary,
      hours,
      history,
      quote,
      catechism,
      devotions: { novenas }
    }

    return NextResponse.json(bundle, { status: 200 })
  } catch (e) {
    // On failure, try to still return whatever parts we can individually fetch one-by-one
    try {
      const liturgical = await getLiturgical(date)
      const rosary = mysteriesForDate(date)
      const fallback: Partial<TodayBundle> = {
        liturgical,
        rosary
      }
      return NextResponse.json(
        { date: toISODate(date), ...fallback, error: 'Partial data due to upstream error' },
        { status: 206 }
      )
    } catch {
      return NextResponse.json({ date: toISODate(date), error: 'Failed to assemble today bundle' }, { status: 500 })
    }
  }
}

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

export const dynamic = 'force-dynamic'

export async function GET() {
  const start = new Date()
  const results: { date: string; ok: boolean }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    try {
      await Promise.all([
        getLiturgical(d),
        getReadings(d),
        getSaint(d),
        getHours(d),
        getHistory(d),
        getQuote(d),
        getCatechism(d),
        getNovenas(d),
        (async () => mysteriesForDate(d))(),
      ])
      results.push({ date: d.toISOString().slice(0, 10), ok: true })
    } catch {
      results.push({ date: d.toISOString().slice(0, 10), ok: false })
    }
  }
  return NextResponse.json({ ok: true, results })
}

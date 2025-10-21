import { NextResponse } from 'next/server'
import { getByDate as getLiturgical } from '@/lib/adapters/liturgical'
import { getByDate as getReadings } from '@/lib/adapters/readings'
import { getByDate as getSaint } from '@/lib/adapters/saint'
import { getByDate as getHours } from '@/lib/adapters/hours'
import { getByDate as getHistory } from '@/lib/adapters/history'
import { getByDate as getQuote } from '@/lib/adapters/quote'
import { getByDate as getCatechism } from '@/lib/adapters/catechism'
import { getByDate as getNovenas } from '@/lib/adapters/novenas'

export const revalidate = 300

export async function GET() {
  const date = new Date()
  const checks = await Promise.allSettled([
    getLiturgical(date),
    getReadings(date),
    getSaint(date),
    getHours(date),
    getHistory(date),
    getQuote(date),
    getCatechism(date),
    getNovenas(),
  ])

  const labels = ['liturgical', 'readings', 'saint', 'hours', 'history', 'quote', 'catechism', 'novenas']
  const status: Record<string, { ok: boolean; detail?: string }> = {}
  checks.forEach((res, i) => {
    status[labels[i]] = res.status === 'fulfilled' ? { ok: true } : { ok: false, detail: String(res.reason) }
  })

  const ok = Object.values(status).every(s => s.ok)
  return NextResponse.json({ ok, status, time: new Date().toISOString() }, { status: ok ? 200 : 207 })
}

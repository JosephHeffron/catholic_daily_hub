import { describe, it, expect } from 'vitest'
import { getByDate as getReadings } from '@/lib/adapters/readings'
import { getByDate as getHours } from '@/lib/adapters/hours'
import { getByDate as getLiturgical } from '@/lib/adapters/liturgical'

const today = new Date(2025, 9, 20)

describe('adapters fallbacks', () => {
  it('readings returns restricted link-only structure', async () => {
    const r = await getReadings(today)
    expect(r.canDisplayFullText).toBe(false)
    expect(r.restricted).toBe(true)
    expect(r.refs.length).toBeGreaterThan(0)
    expect(typeof r.reflection).toBe('string')
  })

  it('hours returns restricted summary or link', async () => {
    const h = await getHours(today)
    expect(h.restricted).toBe(true)
    expect(typeof h.date).toBe('string')
  })

  it('liturgical returns a safe day object', async () => {
    const l = await getLiturgical(today)
    expect(l.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(typeof l.season).toBe('string')
    expect(['green','white','red','violet','rose','black']).toContain(l.color)
  })
})

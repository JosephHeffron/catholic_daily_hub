import { describe, it, expect } from 'vitest'
import { easterSunday } from '@/lib/utils/easter'

function isoDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

describe('easterSunday', () => {
  it('computes known dates', () => {
    expect(isoDate(easterSunday(2024))).toBe('2024-03-31')
    expect(isoDate(easterSunday(2025))).toBe('2025-04-20')
    expect(isoDate(easterSunday(2038))).toBe('2038-04-25')
  })
})

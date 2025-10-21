import { describe, it, expect } from 'vitest'
import { rosarySetForDate } from '@/lib/utils/rosary'

function d(y: number, m: number, day: number) {
  return new Date(y, m - 1, day)
}

describe('rosarySetForDate', () => {
  it('maps weekdays to correct sets', () => {
    expect(rosarySetForDate(d(2025, 10, 20))).toBe('Joyful') // Monday
    expect(rosarySetForDate(d(2025, 10, 21))).toBe('Sorrowful') // Tuesday
    expect(rosarySetForDate(d(2025, 10, 22))).toBe('Glorious') // Wednesday
    expect(rosarySetForDate(d(2025, 10, 23))).toBe('Luminous') // Thursday
    expect(rosarySetForDate(d(2025, 10, 24))).toBe('Sorrowful') // Friday
    expect(rosarySetForDate(d(2025, 10, 25))).toBe('Joyful') // Saturday
    expect(rosarySetForDate(d(2025, 10, 19))).toBe('Glorious') // Sunday
  })
})

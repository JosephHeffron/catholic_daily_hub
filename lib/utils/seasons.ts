import { easterSunday } from './easter'
import { toISODate } from './date'
import type { LiturgicalDay } from '../types'

// Very simplified season derivation adequate for placeholders and tests
export function liturgicalSeasonForDate(d: Date) {
  const y = d.getFullYear()
  const easter = easterSunday(y)
  const _diffDays = Math.floor((stripTime(d).getTime() - stripTime(easter).getTime()) / 86400000)

  // Advent: four Sundays before Christmas (simplified start: Nov 27 onward)
  const christmas = new Date(y, 11, 25)
  const adventStart = new Date(y, 10, 27)
  const _epiphany = new Date(y + 1, 0, 6)

  if (d >= adventStart && d < christmas) return { season: 'Advent', color: 'violet' as const }
  if (d >= christmas && d < new Date(y + 1, 0, 13)) return { season: 'Christmas', color: 'white' as const }
  // Lent starts 46 days before Easter (Ash Wednesday) and ends before Triduum
  const ashWednesday = addDays(easter, -46)
  const _palmSunday = addDays(easter, -7)
  const triduumStart = addDays(easter, -3)
  if (d >= ashWednesday && d < triduumStart) return { season: 'Lent', color: 'violet' as const }
  if (d >= triduumStart && d < easter) return { season: 'Triduum', color: 'red' as const }
  // Easter Season: Easter through Pentecost (49 days after Easter)
  const pentecost = addDays(easter, 49)
  if (d >= easter && d <= pentecost) return { season: 'Easter', color: 'white' as const }
  // Ordinary Time otherwise
  return { season: 'Ordinary Time', color: 'green' as const }
}

function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function addDays(d: Date, days: number) {
  const n = new Date(d)
  n.setDate(n.getDate() + days)
  return n
}

export function simpleLiturgicalDay(d: Date): LiturgicalDay {
  const { season, color } = liturgicalSeasonForDate(d)
  // Simplified rank/celebrations placeholder
  return {
    date: toISODate(d),
    season,
    rank: 'feria',
    color,
    celebrations: [],
  }
}

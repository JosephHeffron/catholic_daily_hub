export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseYMD(yyyy: string | number, mm: string | number, dd: string | number): Date {
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd))
}

export function addDays(d: Date, days: number): Date {
  const nd = new Date(d)
  nd.setDate(d.getDate() + days)
  return nd
}

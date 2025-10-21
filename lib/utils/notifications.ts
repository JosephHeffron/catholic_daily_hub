export type AngelusInfo = { next: Date; label: '06:00' | '12:00' | '18:00'; msUntil: number }

export function nextAngelus(now = new Date()): AngelusInfo {
  const hours = [6, 12, 18]
  const n = new Date(now)
  for (const h of hours) {
    const t = new Date(n.getFullYear(), n.getMonth(), n.getDate(), h, 0, 0, 0)
    if (t > n) return { next: t, label: (h === 6 ? '06:00' : h === 12 ? '12:00' : '18:00'), msUntil: t.getTime() - n.getTime() }
  }
  const tomorrow = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 6, 0, 0, 0)
  return { next: tomorrow, label: '06:00', msUntil: tomorrow.getTime() - n.getTime() }
}

import { redirect } from 'next/navigation'

export const revalidate = 0

export default function TodayRedirectPage() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  redirect(`/calendar/${y}/${m}/${d}`)
}

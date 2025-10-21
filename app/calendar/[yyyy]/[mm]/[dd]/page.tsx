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

function parseDate(params: { yyyy: string; mm: string; dd: string }): Date {
  const { yyyy, mm, dd } = params
  const d = new Date(`${yyyy}-${mm}-${dd}T00:00:00`)
  if (isNaN(d.getTime())) return new Date()
  return d
}

export const revalidate = 900

export async function generateMetadata({ params }: { params: { yyyy: string; mm: string; dd: string } }) {
  const date = parseDate(params)
  return {
    title: `${toISODate(date)}: Saint of the Day, Readings, Rosary — Catholic Daily Hub`
  }
}

export default async function CalendarDatePage({ params }: { params: { yyyy: string; mm: string; dd: string } }) {
  const date = parseDate(params)
  const [liturgical, readings, saints, hours, history, quote, catechism] = await Promise.all([
    getLiturgical(date),
    getReadings(date),
    getSaint(date),
    getHours(date),
    getHistory(date),
    getQuote(date),
    getCatechism(date),
  ])
  const rosary = mysteriesForDate(date)
  const novenas = await getNovenas(date)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{toISODate(date)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <section className="card p-4" aria-labelledby="liturgical">
          <h2 id="liturgical" className="text-xl font-semibold">{liturgical.season} — {liturgical.rank}</h2>
          <p className="text-sm text-neutral-400">Color: {liturgical.color}</p>
          <ul className="mt-2 list-disc pl-5">
            {liturgical.celebrations.map((c, i) => (
              <li key={i}>{c.title}{c.type ? ` — ${c.type}` : ''}</li>
            ))}
          </ul>
        </section>

        <section className="card p-4" aria-labelledby="saint">
          <h2 id="saint" className="text-xl font-semibold">Saint / Feast of the Day</h2>
          {saints.length === 0 ? (
            <p className="text-neutral-400">No data.</p>
          ) : (
            <ul className="space-y-3 mt-2">
              {saints.map((s, i) => (
                <li key={i} className="border-t border-neutral-800 pt-2 first:border-t-0 first:pt-0">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-neutral-300">{s.bio}</p>
                  {s.prayer && <p className="text-sm italic mt-1">“{s.prayer}”</p>}
                  {s.link && (
                    <a className="text-emerald-400 hover:underline text-sm" href={s.link} target="_blank" rel="noreferrer">Read more</a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-4" aria-labelledby="readings">
          <h2 id="readings" className="text-xl font-semibold">Mass Readings</h2>
          <ul className="mt-2 space-y-1">
            {readings.refs.map((r, i) => (
              <li key={i} className="text-sm"><span className="font-medium capitalize">{r.kind}:</span> {r.ref}{r.refrain ? ` — ${r.refrain}` : ''}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-neutral-300">{readings.reflection}</p>
          <a className="mt-2 inline-block text-emerald-400 hover:underline text-sm" href={readings.link} target="_blank" rel="noreferrer">Read on source</a>
        </section>

        <section className="card p-4" aria-labelledby="rosary">
          <h2 id="rosary" className="text-xl font-semibold">Rosary Mystery — {rosary.set}</h2>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            {rosary.items.map((m, i) => (
              <li key={i}>
                <span className="font-medium">{m.title}:</span> <span className="text-sm text-neutral-300">{m.meditation}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="card p-4" aria-labelledby="hours">
          <h2 id="hours" className="text-xl font-semibold">Liturgy of the Hours</h2>
          <div className="mt-2 grid grid-cols-1 gap-3">
            <div>
              <p className="font-medium">Lauds (Morning)</p>
              {hours.lauds ? (
                <ul className="text-sm text-neutral-300 list-disc pl-5">
                  {hours.lauds.title && <li>{hours.lauds.title}</li>}
                  {hours.lauds.antiphon && <li>Antiphon: {hours.lauds.antiphon}</li>}
                  {hours.lauds.psalms?.map((p, i) => <li key={i}>Psalm: {p}</li>)}
                </ul>
              ) : <p className="text-sm text-neutral-400">Summary unavailable</p>}
            </div>
            <div>
              <p className="font-medium">Vespers (Evening)</p>
              {hours.vespers ? (
                <ul className="text-sm text-neutral-300 list-disc pl-5">
                  {hours.vespers.title && <li>{hours.vespers.title}</li>}
                  {hours.vespers.antiphon && <li>Antiphon: {hours.vespers.antiphon}</li>}
                  {hours.vespers.psalms?.map((p, i) => <li key={i}>Psalm: {p}</li>)}
                </ul>
              ) : <p className="text-sm text-neutral-400">Summary unavailable</p>}
            </div>
          </div>
          {hours.link && <a className="mt-2 inline-block text-emerald-400 hover:underline text-sm" href={hours.link} target="_blank" rel="noreferrer">Pray now</a>}
        </section>

        <section className="card p-4" aria-labelledby="history">
          <h2 id="history" className="text-xl font-semibold">On This Day in Church History</h2>
          <ul className="mt-2 space-y-1">
            {history.map((h, i) => (
              <li key={i} className="text-sm"><span className="text-neutral-400">{h.year}:</span> {h.text} {h.link && <a className="text-emerald-400 hover:underline" href={h.link} target="_blank" rel="noreferrer">Learn more</a>}</li>
            ))}
          </ul>
        </section>

        <section className="card p-4" aria-labelledby="quote">
          <h2 id="quote" className="text-xl font-semibold">Quote of the Day</h2>
          <blockquote className="mt-2 text-lg">“{quote.text}”</blockquote>
          <p className="text-sm text-neutral-400">— {quote.author}{quote.source ? `, ${quote.source}` : ''}</p>
        </section>

        <section className="card p-4" aria-labelledby="catechism">
          <h2 id="catechism" className="text-xl font-semibold">Daily Catechism Insight</h2>
          <p className="mt-2 text-sm text-neutral-300">{catechism.paragraph}</p>
          {catechism.number && <p className="text-xs text-neutral-400 mt-1">CCC {catechism.number}{catechism.source ? ` — ${catechism.source}` : ''}</p>}
        </section>

        <section className="card p-4" aria-labelledby="novenas">
          <h2 id="novenas" className="text-xl font-semibold">Novenas & Devotions</h2>
          {novenas.length === 0 ? (
            <p className="text-neutral-400">No active novenas.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {novenas.map((n, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium">{n.name}</span> — Day {n.day}
                  {n.link && <a className="ml-2 text-emerald-400 hover:underline" href={n.link} target="_blank" rel="noreferrer">Open</a>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

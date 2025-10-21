export const metadata = { title: 'About — Catholic Daily Hub' }

export default function AboutPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>About</h1>
      <p>
        Catholic Daily Hub aggregates daily Catholic content with a focus on reverence, accessibility, and
        licensing compliance. When source content is restricted, we provide references and our own original
        reflections, always linking to the canonical sources.
      </p>
      <h2>Sources & Licensing</h2>
      <ul>
        <li>Liturgical calendar: compatible public feeds or computed fallback.</li>
        <li>Mass Readings: references and link to approved source; reflection is original.</li>
        <li>Liturgy of the Hours: summaries when allowed, otherwise deep links.</li>
      </ul>
      <p>We welcome feedback and suggestions to improve this work.</p>
    </div>
  )
}

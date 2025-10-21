export const metadata = { title: 'Widgets — Catholic Daily Hub' }

export default function WidgetsPage() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Mobile Widgets</h2>
      <p className="text-sm text-neutral-400">Compact cards to add to your homepage or use on the Widgets page.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">Saint of the Day (Compact)</h3>
          <p className="text-sm text-neutral-400">Name + 1-line virtue.</p>
        </div>
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">Daily Gospel (Compact)</h3>
          <p className="text-sm text-neutral-400">Reference + 2-line reflection.</p>
        </div>
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">Rosary Today</h3>
          <p className="text-sm text-neutral-400">Five mysteries as chips.</p>
        </div>
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">Liturgical Color Chip</h3>
          <p className="text-sm text-neutral-400">Large colored chip with label.</p>
        </div>
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">Angelus Bell</h3>
          <p className="text-sm text-neutral-400">Next time countdown + toggle.</p>
        </div>
        <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
          <h3 className="font-medium mb-1">History Today Tile</h3>
          <p className="text-sm text-neutral-400">Year + one-line event.</p>
        </div>
      </div>
      <div className="rounded-2xl p-4 bg-neutral-900 border border-neutral-800">
        <h3 className="font-medium mb-2">Add to Home Screen</h3>
        <ol className="list-decimal list-inside text-sm text-neutral-300 space-y-1">
          <li>Open this site in your mobile browser.</li>
          <li>Use the browser menu to find &quot;Add to Home Screen&quot;.</li>
          <li>Follow prompts. On iOS Safari, use the share icon.</li>
        </ol>
      </div>
    </section>
  )
}

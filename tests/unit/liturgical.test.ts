import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

function makeRes({ ok, status = 200, contentType = 'application/json', body = '{}' }: { ok: boolean; status?: number; contentType?: string; body?: string }) {
  return {
    ok,
    status,
    headers: new Headers({ 'content-type': contentType }),
    json: async () => JSON.parse(body),
    text: async () => body,
  } as any
}

const d1 = new Date(2031, 0, 1)
const d2 = new Date(2031, 0, 2)

describe('liturgical adapter handles non-JSON/502 upstream', () => {
  beforeEach(() => {
    vi.resetModules()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('falls back when upstream returns 502 HTML', async () => {
    process.env.SOURCE_LITURGICAL_API_URL = 'https://example.com/liturgical'
    const fetchSpy = vi.spyOn(globalThis as any, 'fetch').mockResolvedValue(
      makeRes({ ok: false, status: 502, contentType: 'text/html', body: '<html>bad gateway</html>' })
    )
    const { getByDate } = await import('@/lib/adapters/liturgical')
    const res = await getByDate(d1)
    expect(res.restricted).toBe(true)
    expect(res.date).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(fetchSpy).toHaveBeenCalled()
  })

  it('falls back when upstream returns 200 but text/html', async () => {
    process.env.SOURCE_LITURGICAL_API_URL = 'https://example.com/liturgical'
    const fetchSpy = vi.spyOn(globalThis as any, 'fetch').mockResolvedValue(
      makeRes({ ok: true, status: 200, contentType: 'text/html', body: '<html>ok but html</html>' })
    )
    const { getByDate } = await import('@/lib/adapters/liturgical')
    const res = await getByDate(d2)
    expect(res.restricted).toBe(true)
    expect(res.date).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(fetchSpy).toHaveBeenCalled()
  })
})

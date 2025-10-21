export type LiturgicalDay = {
  date: string
  season: string
  week?: number
  rank: 'feria' | 'memorial' | 'feast' | 'solemnity'
  color: 'green' | 'white' | 'red' | 'violet' | 'rose' | 'black'
  celebrations: { title: string; type?: string }[]
  restricted?: boolean
}

export type ReadingRef = {
  kind: 'first' | 'psalm' | 'gospel' | 'second'
  ref: string
  refrain?: string
}

export type MassReadings = {
  date: string
  refs: ReadingRef[]
  reflection: string
  link: string
  canDisplayFullText: boolean
  restricted?: boolean
}

export type SaintDay = {
  date: string
  name: string
  bio: string
  patronage?: string[]
  prayer?: string
  link?: string
  color?: LiturgicalDay['color']
  restricted?: boolean
}

export type HoursSummary = {
  date: string
  lauds?: { title?: string; psalms?: string[]; antiphon?: string }
  vespers?: { title?: string; psalms?: string[]; antiphon?: string }
  audio?: { lauds?: string; vespers?: string }
  link?: string
  restricted?: boolean
}

export type HistoryEvent = { year: number; text: string; link?: string }

export type TodayBundle = {
  liturgical: LiturgicalDay
  readings: MassReadings
  saint: SaintDay[]
  rosary: {
    set: 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous'
    items: { title: string; meditation: string; scriptureRef?: string }[]
  }
  hours: HoursSummary
  history: HistoryEvent[]
  quote: { text: string; author: string; source?: string }
  catechism: { paragraph: string; number?: string; source?: string; restricted?: boolean }
  devotions: { novenas: { name: string; day: number; link?: string }[] }
}

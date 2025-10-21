import './globals.css'
import { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'

export const metadata = {
  title: 'Catholic Daily Hub',
  description: 'Daily Catholic content with graceful fallbacks.',
  metadataBase: new URL('https://catholic-daily-hub.example'),
  manifest: '/manifest.webmanifest'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-neutral-800 px-3 py-2 rounded">
          Skip to content
        </a>
        <NextIntlClientProvider locale="en">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-semibold">Catholic Daily Hub</h1>
              <p className="text-sm text-neutral-400">Pray, learn, and live the liturgical day.</p>
            </header>
            <main id="main">{children}</main>
            <footer className="mt-16 text-sm text-neutral-500">
              <p>&copy; {new Date().getFullYear()} Catholic Daily Hub</p>
            </footer>
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

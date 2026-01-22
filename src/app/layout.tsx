import type { Metadata } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cars & Connection - Real Car Culture Meets Pop Nostalgia',
  description: 'A turbo-charged social playground for car lovers. Daily challenges, authentic car data, and a community that respects both the Fast & Furious fan and the registry nerd.',
  keywords: ['cars', 'automotive', 'social', 'challenges', 'JDM', 'muscle cars', 'collectors'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${rajdhani.variable} font-rajdhani bg-bg-dark text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

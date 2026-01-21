import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-retro-black text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

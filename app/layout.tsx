import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const _notoJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-jp", weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: 'Jujutsu Kaisen API - Documentation',
  description: 'RESTful API for Jujutsu Kaisen anime and manga data. Access information about sorcerers, curses, techniques, and more.',
  generator: 'v0.app',
  icons: {
    icon: '/ico.webp',
    apple: '/ico.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.variable} ${_geistMono.variable} ${_notoJP.variable} font-sans antialiased bg-[#0a0a0a]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

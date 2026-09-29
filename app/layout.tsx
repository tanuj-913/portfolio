import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space',
  display: 'swap',
})

const title = 'Tanuj Jenna — AI-Native Developer'
const description =
  'I build applications where AI does real work. Web, mobile, backend — and the AI inside them. From first requirement through to deployment.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${space.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

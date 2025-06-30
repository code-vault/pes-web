// app/layout.tsx (NEW FILE)
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './[locale]/globals.css' // Import your global styles

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Purvodaya Energy Solutions',
  description: 'Leading solar energy solutions provider in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
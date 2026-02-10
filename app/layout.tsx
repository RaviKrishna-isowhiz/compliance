import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Compliance Manager – Risk-Based Federal Compliance Assessment',
  description: 'Smart compliance questionnaire with AI-validated evidence. Risk-first funnel for auditors.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fafbfc', color: '#0f172a', fontFamily: 'var(--font-geist), system-ui, -apple-system, sans-serif', fontSize: '15px', lineHeight: '1.6' }}>
        {children}
      </body>
    </html>
  )
}

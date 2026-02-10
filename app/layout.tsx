import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Compliance Manager - Federal Compliance Assessment',
  description: 'Risk-based federal compliance assessment platform. Manage 2 CFR 200, Title VI, NEPA, and ADA compliance with AI-validated evidence verification.',
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} style={{ margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff', color: '#111827', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '16px', lineHeight: '1.6' }}>
        {children}
      </body>
    </html>
  )
}

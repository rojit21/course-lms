import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ClientProviders from '@/components/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Course Gen - Become a Creator, Learn AI, Start Earning',
  description: 'Professional AI Masterclass courses designed to help you become a creator and start earning. Learn AI, ChatGPT, Generative AI, and more.',
  keywords: 'AI courses, ChatGPT, Generative AI, Creator courses, Online learning, AI masterclass',
  authors: [{ name: 'Course Gen Team' }],
  openGraph: {
    title: 'Course Gen - Become a Creator, Learn AI, Start Earning',
    description: 'Professional AI Masterclass courses designed to help you become a creator and start earning.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Course Gen - Become a Creator, Learn AI, Start Earning',
    description: 'Professional AI Masterclass courses designed to help you become a creator and start earning.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 min-h-screen`}>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #dc2626',
            },
          }}
        />
      </body>
    </html>
  )
}

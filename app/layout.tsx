import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'

const inter = Inter({ 
  weight: ['400', '600', '800', '900'], 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-space-mono' 
})

export const metadata: Metadata = {
  title: 'VΞLT | HIGH TENSION APPAREL',
  description: 'Industrial cybernetic garments. Extreme technicality.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} font-mono bg-bg-dark text-text-main antialiased selection:bg-accent-volt selection:text-black`}>
        <div className="tech-grid"></div>
        <div 
          className="fixed inset-0 pointer-events-none -z-50"
          style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)' }}
        ></div>
        <CustomCursor />
        <Preloader />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

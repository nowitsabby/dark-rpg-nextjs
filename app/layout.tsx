import { Inter } from 'next/font/google'

import './global.css'
import SrdSidebar from '@/components/layout/SrdSidebar'
import { loadSidebar } from '@/lib/srd'
import NavBar from '@/components/layout/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dark RPG SRD',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar title={metadata.title} />
        <div style={{ display: 'flex', height: 'auto' }}>
          <SrdSidebar sidebar={loadSidebar()} />
          <main style={{ height: 'auto', paddingLeft: '8px', width: '100%', borderLeftWidth: '1px', borderLeftStyle: 'solid' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar'
import RegisterModal from './components/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrekTrove',
  description: 'Locate appartement near you',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser = {currentUser} />
        {children}
        </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@recycle-chain/ui/src/app/globals.css'
import { ApolloProvider } from '@recycle-chain/network/src/config/apollo'
import { Header } from '@recycle-chain/ui/src/components/organisms/Header'
import { Container } from '@recycle-chain/ui/src/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body className={`${inter.className} bg-gray-25`}>
          <Header />
          <Container>{children}</Container>
        </body>
      </ApolloProvider>
    </html>
  )
}

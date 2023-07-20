import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  Roboto_Flex as Roboto,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Gerador de Senha',
  description: 'Aplicativo que gera sua senha. Forte e Seguro.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} bg-gray-900 font-sans text-gray-100`}>
        {children}
      </body>
    </html>
  )
}

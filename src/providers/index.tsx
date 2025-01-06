import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { AuthProvider } from 'src/providers/Auth'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { TypedLocale } from 'payload'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'


type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export async function Providers({ children, params }: Args)  {

  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <NextIntlClientProvider messages={messages}>
        <AuthProvider
          // To toggle between the REST and GraphQL APIs,
          // change the `api` prop to either `rest` or `gql`
          api="rest" // change this to `gql` to use the GraphQL API
        >
        {children}
        </AuthProvider>
        </NextIntlClientProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}

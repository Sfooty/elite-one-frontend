'use client'

import React, { useTransition } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { TypedLocale } from 'payload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import localization from '@/i18n/localization'
import { Login } from '@/components/Login'
import { useAuth } from 'src/providers/Auth'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'


export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  const { user } = useAuth()

  return (
    <nav className="flex justify-between w-full">
      <div className="flex gap-24 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </div>
      <div className="items-center flex gap-4">
        <LocaleSwitcher />
        <Login user={user}/>
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
      </div>
    </nav>
  )
}

'use client'
import {useHeaderTheme} from '@/providers/HeaderTheme'
import Link from 'next/link'
import {usePathname, useParams} from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type {Header} from '@/payload-types'

import {Logo} from '@/components/Logo/Logo'
import {HeaderNav} from './Nav'

import teamsData from "@/data/team-data";
import FixturesCarousel from "@/components/FixturesCarousel";


interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({header}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const {headerTheme, setHeaderTheme} = useHeaderTheme()
  const pathname = usePathname()
  const locale = useParams().locale;

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <div className="bg-secondary-foreground" {...(theme ? {'data-theme': theme} : {})}>
      {pathname === `/${locale}` &&
        <div className="container flex justify-center relative z-20 py-5">
          <div className="flex space-x-4 overflow-x-scroll p-2">
            {teamsData.map((team, index) => (
              <a
                key={index}
                href={team.url ? team.url : undefined}
                target={team.url ? "_blank" : undefined}
                rel={team.url ? "noopener noreferrer" : undefined}
                style={{display: 'inline-block'}}
                className="cursor-pointer"
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  className="transition-transform transform hover:scale-110"
                  style={{width: '50px', height: '50px', borderRadius: '50%'}}
                />
              </a>
            ))}
          </div>
        </div>
      }
      <div className="bg-primary-foreground">
        <header className="container sticky top-0 z-20" {...(theme ? {'data-theme': theme} : {})}>
          <div className="py-8 border-b border-border flex start gap-24 ">
            <Link href="/">
              <Logo loading="eager" priority="high" className="{/*invert dark:invert-0*/}"/>
            </Link>
            <HeaderNav header={header}/>
          </div>
        </header>
      </div>

      {pathname === `/${locale}` &&
        <FixturesCarousel/>
      }
    </div>
  )
}

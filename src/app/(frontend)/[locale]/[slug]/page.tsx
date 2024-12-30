import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode, headers as getHeaders } from 'next/headers'
import React, { cache, Fragment } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { Gutter } from '@payloadcms/ui'
import { HydrateClientUser } from '@/app/(frontend)/[locale]/_components/HydrateClientUser'
import config from '../../../../payload.config'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'acceuil', locale = 'fr' } = await paramsPromise
  const url = `/${slug}`

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale,
  })

  // Remove this code once your website is seeded
/*  if (!page && slug === 'home') {
    page = homeStatic
  }*/

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })

  return (
    <Fragment>
      <HydrateClientUser permissions={permissions} user={user} />
      <Gutter>
        <article className="pt-10 pb-24">
          <PageClient />
          {/* Allows redirects for valid pages too */}
          <PayloadRedirects disableNotFound url={url} />
          <RenderHero {...hero} />
          <RenderBlocks paddingTop={false} blocks={layout} />
        </article>
      </Gutter>
    </Fragment>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'acceuil', locale = 'fr' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    locale,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

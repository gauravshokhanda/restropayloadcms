import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getDictionary } from '@/dictionaries'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const slug = 'home'
  const url = '/'

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const dictionary = await getDictionary('en')

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale="en" dictionary={dictionary} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'home',
  })

  return generateMeta({ doc: page, type: 'page', locale: 'en' })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // First try to find page with the specified slug
  let result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // If no page found with 'home' slug, try to find page with empty slug (fallback for home)
  if (!result.docs?.[0] && slug === 'home') {
    result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        or: [
          {
            slug: {
              equals: '',
            },
          },
          {
            slug: {
              exists: false,
            },
          },
        ],
      },
    })
  }

  return result.docs?.[0] || null
})

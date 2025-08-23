import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getDictionary } from '@/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'home',
  })

  return generateMeta({ doc: page })
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const dictionary = await getDictionary('hi')

  const page = await queryPageBySlug({
    slug: 'home',
  })

  if (!page) {
    return (
      <article>
        <RenderHero {...homeStatic.hero} />
        <RenderBlocks blocks={homeStatic.layout} locale="hi" dictionary={dictionary} />
      </article>
    )
  }

  const { hero, layout } = page

  if (draft) {
    return (
      <article>
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} locale="hi" dictionary={dictionary} />
      </article>
    )
  }

  return (
    <article>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale="hi" dictionary={dictionary} />
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
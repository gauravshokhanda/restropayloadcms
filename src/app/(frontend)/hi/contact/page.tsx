import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getDictionary } from '@/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'contact',
  })

  return generateMeta({ doc: page })
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const dictionary = await getDictionary('hi')

  const page = await queryPageBySlug({
    slug: 'contact',
  })

  if (!page) {
    return <div>Page not found</div>
  }

  const { hero, layout } = page

  const url = '/hi/contact'

  if (draft) {
    return (
      <article className="pt-16 pb-24">
        <PayloadRedirects disableNotFound url={url} />
        <LivePreviewListener />
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} locale="hi" dictionary={dictionary} />
      </article>
    )
  }

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />
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
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getDictionary } from '@/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'contact',
    locale: 'es',
  })

  return generateMeta({ doc: page, type: 'page', locale: 'es' })
}

export default async function Page() {
  const dictionary = await getDictionary('es')

  const page = await queryPageBySlug({
    slug: 'contact',
    locale: 'es',
  })

  if (!page) {
    // Fallback to English version
    const englishPage = await queryPageBySlug({
      slug: 'contact',
      locale: 'en',
    })

    if (!englishPage) {
      return notFound()
    }

    const { hero, layout } = englishPage
    return (
      <article>
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} locale="es" dictionary={dictionary} />
      </article>
    )
  }

  const { hero, layout } = page

  return (
    <article>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale="es" dictionary={dictionary} />
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string; locale?: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
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

  return result.docs?.[0] || null
})

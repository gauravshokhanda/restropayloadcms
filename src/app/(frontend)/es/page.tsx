import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { homeStatic } from '@/endpoints/seed/home-static'
import { getDictionary } from '@/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = draftMode()

  const page = await queryPageBySlug({
    slug: 'home',
    locale: 'es',
  })

  return generateMeta({ doc: page, type: 'page', locale: 'es' })
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode()
  const dictionary = await getDictionary('es')

  const page = await queryPageBySlug({
    slug: 'home',
    locale: 'es',
  })

  if (!page) {
    // Fallback to English version or static content
    const englishPage = await queryPageBySlug({
      slug: 'home',
      locale: 'en',
    })

    if (englishPage) {
      const { hero, layout } = englishPage
      return (
        <article>
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} locale="es" dictionary={dictionary} />
        </article>
      )
    }

    // Final fallback to static content
    return (
      <article>
        <div className="container py-16">
          <h1 className="text-4xl font-bold mb-8">Bienvenido</h1>
          <p className="text-lg">Esta es la página de inicio en español.</p>
        </div>
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

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale?: string }) => {
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
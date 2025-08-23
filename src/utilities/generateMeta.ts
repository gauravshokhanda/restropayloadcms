import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { generateStructuredData } from './generateStructuredData'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  type?: 'page' | 'post'
  locale?: string
}): Promise<Metadata> => {
  const { doc, type = 'page', locale = 'en' } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  const description = doc?.meta?.description || 'An open-source website built with Payload and Next.js.'
  
  // Generate structured data
  const structuredData = generateStructuredData({ doc, type, locale })

  const metadata: Metadata = {
    title,
    description,
    keywords: type === 'post' && 'categories' in doc && doc.categories 
      ? (doc.categories as any[]).map(cat => typeof cat === 'object' && cat?.title ? cat.title : '').filter(Boolean).join(', ')
      : undefined,
    authors: type === 'post' && 'authors' in doc && doc.authors
      ? (doc.authors as any[]).map(author => ({ name: typeof author === 'object' && author?.name ? author.name : 'Unknown' }))
      : undefined,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doc?.meta?.title || title,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      type: type === 'post' ? 'article' : 'website',
      locale,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  // Add structured data as other metadata
  if (structuredData) {
    metadata.other = {
      'application/ld+json': JSON.stringify(structuredData),
    }
  }

  return metadata
}

import type { Page, Post, Product } from '../payload-types'
import { getServerSideURL } from './getURL'

export interface StructuredDataArgs {
  doc: Partial<Page> | Partial<Post> | Partial<Product> | null
  type?: 'page' | 'post' | 'product'
  locale?: string
}

export const generateStructuredData = (args: StructuredDataArgs) => {
  const { doc, type = 'page', locale = 'en' } = args
  const serverUrl = getServerSideURL()
  
  if (!doc) return null

  const getSchemaType = () => {
    switch (type) {
      case 'post':
        return 'Article'
      case 'product':
        return 'Product'
      default:
        return 'WebPage'
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseStructuredData: any = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(),
    name: doc.title || doc.meta?.title || 'Payload Website Template',
    headline: doc.title || doc.meta?.title || 'Payload Website Template',
    description: doc.meta?.description || 'An open-source website built with Payload and Next.js.',
    url: doc.slug ? `${serverUrl}/${doc.slug}` : serverUrl,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Payload Website Template',
      url: serverUrl,
    },
  }

  // Add image if available
  if (doc.meta?.image && typeof doc.meta.image === 'object' && 'url' in doc.meta.image) {
    const imageUrl = doc.meta.image.sizes?.og?.url 
      ? `${serverUrl}${doc.meta.image.sizes.og.url}`
      : `${serverUrl}${doc.meta.image.url}`
    
    baseStructuredData['image'] = {
      '@type': 'ImageObject',
      url: imageUrl,
      width: doc.meta.image.sizes?.og?.width || 1200,
      height: doc.meta.image.sizes?.og?.height || 630,
    }
  }

  // Add article-specific data for posts
  if (type === 'post' && 'publishedAt' in doc && doc.publishedAt) {
    baseStructuredData['@type'] = 'Article'
    baseStructuredData['datePublished'] = doc.publishedAt
    baseStructuredData['dateModified'] = doc.updatedAt || doc.publishedAt
    
    // Add author information if available
    if ('authors' in doc && doc.authors && Array.isArray(doc.authors)) {
      const authors = doc.authors.map(author => {
        if (typeof author === 'object' && author !== null && 'name' in author) {
          return {
            '@type': 'Person',
            name: author.name,
          }
        }
        return null
      }).filter(Boolean)
      
      if (authors.length > 0) {
        baseStructuredData['author'] = authors.length === 1 ? authors[0] : authors
      }
    }
    
    // Add categories if available
    if ('categories' in doc && doc.categories && Array.isArray(doc.categories)) {
      const categories = doc.categories.map(category => {
        if (typeof category === 'object' && category !== null && 'title' in category) {
          return category.title
        }
        return null
      }).filter(Boolean)
      
      if (categories.length > 0) {
        baseStructuredData['keywords'] = categories.join(', ')
      }
    }
  }

  return baseStructuredData
}

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export const generateOrganizationStructuredData = () => {
  const serverUrl = getServerSideURL()
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Payload Website Template',
    url: serverUrl,
    logo: `${serverUrl}/website-template-OG.webp`,
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/payloadcms',
      // 'https://github.com/payloadcms',
    ],
  }
}
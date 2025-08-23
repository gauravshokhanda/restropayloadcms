import type { CollectionAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  if (doc._status === 'published') {
    const path = `/products/${doc.slug}`

    payload.logger.info(`Revalidating product at path: ${path}`)

    revalidateTag('products-sitemap')
    revalidateTag(`product_${doc.slug}`)
  }

  return doc
}
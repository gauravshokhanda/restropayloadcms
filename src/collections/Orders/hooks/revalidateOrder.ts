import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

import type { Order } from '../../../payload-types'

export const revalidateOrder: CollectionAfterChangeHook<Order> = (args) => {
  const { doc, req: { payload } } = args;
  if (doc.status === 'delivered') {
    const path = `/orders/${doc.orderNumber}`

    payload.logger.info(`Revalidating order at path: ${path}`)

    revalidatePath(path)
    revalidatePath('/orders')
  }

  return doc
}
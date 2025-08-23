import type { CollectionAfterChangeHook } from 'payload/types'
import { revalidatePath } from 'next/cache'

import type { Order } from '../../../payload-types'

export const revalidateOrder: CollectionAfterChangeHook<Order> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/orders/${doc.orderNumber}`

    payload.logger.info(`Revalidating order at path: ${path}`)

    revalidatePath(path)
    revalidatePath('/orders')
  }

  return doc
}
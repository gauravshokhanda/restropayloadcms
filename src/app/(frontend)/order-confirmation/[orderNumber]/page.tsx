import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { OrderConfirmation } from './OrderConfirmation'
import type { Order } from '@/payload-types'

interface OrderConfirmationPageProps {
  params: Promise<{
    orderNumber: string
  }>
}

export async function generateMetadata({
  params,
}: OrderConfirmationPageProps): Promise<Metadata> {
  const { orderNumber } = await params
  return {
    title: `Order Confirmation - ${orderNumber}`,
    description: 'Your order has been confirmed',
  }
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { orderNumber } = await params
  const payload = await getPayloadHMR({ config: configPromise })

  try {
    const orders = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: {
          equals: orderNumber,
        },
      },
      limit: 1,
    })

    if (!orders.docs.length) {
      notFound()
    }

    const order = orders.docs[0] as Order

    return (
      <div className="container mx-auto px-4 py-8">
        <OrderConfirmation order={order} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching order:', error)
    notFound()
  }
}
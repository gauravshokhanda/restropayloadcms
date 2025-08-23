import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await request.json()

    // Create the order
    const order = await payload.create({
      collection: 'orders',
      data: {
        customerInfo: data.customerInfo,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        items: data.items,
        subtotal: data.subtotal,
        tax: data.tax,
        shipping: data.shipping,
        total: data.total,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        status: data.status,
        notes: data.notes,
      },
    })

    return NextResponse.json({ success: true, doc: order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const orders = await payload.find({
      collection: 'orders',
      page,
      limit,
      sort: '-createdAt',
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
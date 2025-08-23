'use client'

import React from 'react'
import type { Order, Product, Media } from '@/payload-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Media as MediaComponent } from '@/components/Media'
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'

interface OrderConfirmationProps {
  order: Order
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Order Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="font-semibold">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items Ordered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => {
              const product = item.product as Product
              const image = Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : null
              
              return (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {image && typeof image === 'object' && (
                      <MediaComponent
                        resource={image as Media}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{product.title}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              )
            })}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Shipping Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">
                {order.customerInfo.firstName} {order.customerInfo.lastName}
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium">
                  {order.paymentMethod === 'credit_card' && 'Credit Card'}
                  {order.paymentMethod === 'paypal' && 'PayPal'}
                  {order.paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                  {order.paymentMethod === 'cod' && 'Cash on Delivery'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Email</p>
                <p className="font-medium">{order.customerInfo.email}</p>
              </div>
              {order.customerInfo.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{order.customerInfo.phone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>• You will receive an email confirmation shortly at <strong>{order.customerInfo.email}</strong></p>
            <p>• We'll send you tracking information once your order ships</p>
            <p>• If you have any questions, please contact our customer service team</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import React, { useState } from 'react'
import { useCart } from '@/providers/Cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Media as MediaComponent } from '@/components/Media'

interface CheckoutFormData {
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
  }
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  billingAddress: {
    sameAsShipping: boolean
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  notes: string
}

export const CheckoutForm: React.FC = () => {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerInfo: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    billingAddress: {
      sameAsShipping: true,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: '',
    notes: '',
  })

  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
  const total = subtotal + tax + shipping

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (section: keyof CheckoutFormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(prev[section] as any),
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData = {
        customerInfo: formData.customerInfo,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress.sameAsShipping
          ? formData.shippingAddress
          : formData.billingAddress,
        items: state.items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'pending',
        status: 'pending',
        notes: formData.notes,
      }

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        router.push(`/order-confirmation/${order.doc.orderNumber}`)
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some products to your cart before checking out.</p>
        <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div className="lg:order-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.map((item) => {
              const image =
                Array.isArray(item.product.images) && item.product.images.length > 0
                  ? item.product.images[0]
                  : null

              return (
                <div key={item.product.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {image && typeof image === 'object' && (
                      <MediaComponent
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        resource={image as any}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.title}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Form */}
      <div className="lg:order-1 space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.customerInfo.firstName}
                  onChange={(e) => handleInputChange('customerInfo', 'firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.customerInfo.lastName}
                  onChange={(e) => handleInputChange('customerInfo', 'lastName', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.customerInfo.email}
                onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.customerInfo.phone}
                onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shippingStreet">Street Address *</Label>
              <Input
                id="shippingStreet"
                required
                value={formData.shippingAddress.street}
                onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingCity">City *</Label>
                <Input
                  id="shippingCity"
                  required
                  value={formData.shippingAddress.city}
                  onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="shippingState">State *</Label>
                <Input
                  id="shippingState"
                  required
                  value={formData.shippingAddress.state}
                  onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingPostalCode">Postal Code *</Label>
                <Input
                  id="shippingPostalCode"
                  required
                  value={formData.shippingAddress.postalCode}
                  onChange={(e) =>
                    handleInputChange('shippingAddress', 'postalCode', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="shippingCountry">Country *</Label>
                <Input
                  id="shippingCountry"
                  required
                  value={formData.shippingAddress.country}
                  onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAsShipping"
                checked={formData.billingAddress.sameAsShipping}
                onCheckedChange={(checked) =>
                  handleInputChange('billingAddress', 'sameAsShipping', checked)
                }
              />
              <Label htmlFor="sameAsShipping">Same as shipping address</Label>
            </div>

            {!formData.billingAddress.sameAsShipping && (
              <>
                <div>
                  <Label htmlFor="billingStreet">Street Address *</Label>
                  <Input
                    id="billingStreet"
                    required
                    value={formData.billingAddress.street}
                    onChange={(e) => handleInputChange('billingAddress', 'street', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingCity">City *</Label>
                    <Input
                      id="billingCity"
                      required
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State *</Label>
                    <Input
                      id="billingState"
                      required
                      value={formData.billingAddress.state}
                      onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingPostalCode">Postal Code *</Label>
                    <Input
                      id="billingPostalCode"
                      required
                      value={formData.billingAddress.postalCode}
                      onChange={(e) =>
                        handleInputChange('billingAddress', 'postalCode', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingCountry">Country *</Label>
                    <Input
                      id="billingCountry"
                      required
                      value={formData.billingAddress.country}
                      onChange={(e) =>
                        handleInputChange('billingAddress', 'country', e.target.value)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cod">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Order Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Order Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any special instructions for your order..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting || !formData.paymentMethod}
        >
          {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
        </Button>
      </div>
    </form>
  )
}

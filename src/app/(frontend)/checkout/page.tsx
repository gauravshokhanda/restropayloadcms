import React from 'react'
import { Metadata } from 'next'
import { CheckoutForm } from './CheckoutForm'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase',
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}
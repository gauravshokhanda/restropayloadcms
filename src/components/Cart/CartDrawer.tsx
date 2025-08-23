'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/providers/Cart'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'

export const CartDrawer: React.FC = () => {
  const { state, removeItem, updateQuantity, closeCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shopping Cart
              {state.totalItems > 0 && (
                <Badge className="ml-2">{state.totalItems}</Badge>
              )}
            </h2>
            <Button variant="ghost" size="sm" onClick={closeCart}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={closeCart} asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => {
                  const itemTotal = item.product.price * item.quantity
                  
                  return (
                    <div key={item.product.id} className="flex space-x-3 p-3 border rounded-lg">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {item.product.images && item.product.images[0] && (
                          <MediaComponent
                            resource={item.product.images[0].image as Media}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="hover:text-primary"
                          >
                            {item.product.title}
                          </Link>
                        </h3>
                        
                        {item.product.sku && (
                          <p className="text-xs text-gray-500 mt-1">SKU: {item.product.sku}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatPrice(itemTotal)}</p>
                            <p className="text-xs text-gray-500">
                              {formatPrice(item.product.price)} each
                            </p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 text-xs mt-1 p-0 h-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(state.totalPrice)}</span>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/cart" onClick={closeCart}>
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
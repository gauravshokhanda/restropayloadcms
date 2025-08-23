'use client'

import React from 'react'
import { useCart } from '@/providers/Cart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'

export const CartIcon: React.FC = () => {
  const { state, toggleCart } = useCart()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCart}
      className="relative p-2"
      aria-label={`Shopping cart with ${state.totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {state.totalItems > 0 && (
        <Badge
          className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
          variant="destructive"
        >
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </Badge>
      )}
    </Button>
  )
}
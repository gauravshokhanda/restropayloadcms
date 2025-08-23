'use client'

import React, { useState } from 'react'
import type { Product, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/providers/Cart'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'

interface ProductDetailProps {
  product: Product
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
    openCart()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = isOnSale
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {product.images && product.images.length > 0 && (
              <MediaComponent
                resource={product.images[selectedImageIndex]?.image as Media}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((imageItem, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <MediaComponent
                    resource={imageItem.image as Media}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            {product.shortDescription && (
              <p className="mt-2 text-lg text-gray-600">{product.shortDescription}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {isOnSale && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
                <Badge variant="destructive">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          {/* SKU */}
          {product.sku && (
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          )}

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {typeof category === 'object' ? category.name : category}
                </Badge>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x py-1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          {product.inventory?.trackQuantity && (
            <div className="text-sm">
              {product.inventory.quantity && product.inventory.quantity > 0 ? (
                <span className="text-green-600">
                  ✓ In stock ({product.inventory.quantity} available)
                </span>
              ) : (
                <span className="text-red-600">
                  {product.inventory.allowBackorder ? '⚠ Available for backorder' : '✗ Out of stock'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose max-w-none">
            <RichText content={product.description} enableGutter={false} />
          </div>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b">
                <span className="font-medium">{spec.name}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct, index) => {
              if (typeof relatedProduct === 'object') {
                return (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    {relatedProduct.images && relatedProduct.images[0] && (
                      <div className="aspect-square mb-2 overflow-hidden rounded-md bg-gray-100">
                        <MediaComponent
                          resource={relatedProduct.images[0].image as Media}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-medium text-sm">{relatedProduct.title}</h3>
                    <p className="text-sm font-bold mt-1">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
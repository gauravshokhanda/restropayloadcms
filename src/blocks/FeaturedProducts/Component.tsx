import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { FeaturedProductsBlock, Product } from '@/payload-types'
import type { Dictionary } from '@/dictionaries'

export const FeaturedProductsBlockComponent: React.FC<
  FeaturedProductsBlock & { dictionary?: Dictionary }
> = ({ title, subtitle, products, showViewAllButton = true, dictionary }) => {
  if (!products || products.length === 0) {
    return null
  }

  const validProducts = products.filter(
    (product): product is Product => typeof product === 'object' && product !== null,
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title || dictionary?.products.featuredProducts || 'Featured Products'}
          </h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {validProducts.slice(0, 8).map((product) => {
            const isOutOfStock = product.inventory?.quantity !== undefined && product.inventory?.quantity !== null && product.inventory.quantity <= 0

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square relative overflow-hidden">
                    {product.images && product.images.length > 0 && (
                      <Media
                        resource={product.images[0].image}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        fill
                      />
                    )}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="bg-red-600 text-white">
                          {dictionary?.products.outOfStock || 'Out of Stock'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  {product.shortDescription && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>

                    {product.categories && product.categories.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {typeof product.categories[0] === 'object'
                          ? product.categories[0].title
                          : product.categories[0]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/products">
                {dictionary?.products.viewAllProducts || 'View All Products'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

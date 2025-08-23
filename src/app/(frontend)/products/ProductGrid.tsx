'use client'

import React from 'react'
import Link from 'next/link'
import type { Product, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductGridProps {
  products: Product[]
  pagination: {
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, pagination }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page))
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => {
          const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price
          const discountPercentage = isOnSale
            ? Math.round(
                ((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100,
              )
            : 0

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {product.images && product.images[0] && (
                  <MediaComponent
                    resource={product.images[0].image as Media}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
                {product.featured && (
                  <Badge className="absolute top-2 left-2" variant="default">
                    Featured
                  </Badge>
                )}
                {isOnSale && (
                  <Badge className="absolute top-2 right-2" variant="destructive">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>

                {product.shortDescription && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.categories.slice(0, 2).map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {typeof category === 'object' ? category.name : category}
                      </Badge>
                    ))}
                    {product.categories.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {isOnSale && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice!)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock Status */}
                {product.inventory?.trackQuantity && (
                  <div className="mt-2">
                    {product.inventory.quantity && product.inventory.quantity > 0 ? (
                      <span className="text-xs text-green-600">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600">
                        {product.inventory.allowBackorder ? 'Backorder' : 'Out of Stock'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                const current = pagination.currentPage
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= current - 1 && page <= current + 1)
                )
              })
              .map((page, index, array) => {
                const showEllipsis = index > 0 && page - array[index - 1] > 1
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="px-2 py-1 text-gray-500">...</span>}
                    <Button
                      variant={page === pagination.currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                )
              })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}

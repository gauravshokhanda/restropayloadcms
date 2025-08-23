import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { ProductCategoriesBlock, ProductCategory } from '@/payload-types'

export const ProductCategoriesBlockComponent: React.FC<ProductCategoriesBlock> = ({
  title = 'Shop by Category',
  subtitle,
  categories,
  layout = 'grid',
}) => {
  if (!categories || categories.length === 0) {
    return null
  }

  const validCategories = categories.filter(
    (category): category is ProductCategory => typeof category === 'object' && category !== null,
  )

  if (layout === 'cards') {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>

          {/* Categories Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {validCategories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    {category.image && (
                      <Media
                        resource={category.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fill
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Grid layout
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {validCategories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  {category.image ? (
                    <Media
                      resource={category.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">📦</span>
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

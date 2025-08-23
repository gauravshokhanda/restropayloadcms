import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import type { Product, ProductCategory } from '@/payload-types'
import { ProductGrid } from '../../products/ProductGrid'
import { ProductFilters } from '../../products/ProductFilters'
import { getDictionary } from '@/dictionaries'

type Args = {
  searchParams: Promise<{
    category?: string
    sort?: string
    page?: string
    search?: string
  }>
}

export default async function ProductsPageES({ searchParams }: Args) {
  const { category, sort = 'createdAt', page = '1', search } = await searchParams
  const currentPage = parseInt(page, 10)
  const limit = 12
  const dictionary = await getDictionary('es')

  const payload = await getPayload({ config: configPromise })

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    _status: { equals: 'published' },
  }

  if (category) {
    where.categories = { in: [category] }
  }

  if (search) {
    where.or = [{ title: { contains: search } }, { shortDescription: { contains: search } }]
  }

  // Build sort clause
  let sortField = 'createdAt'
  let sortOrder: 'asc' | 'desc' = 'desc'

  switch (sort) {
    case 'price-asc':
      sortField = 'price'
      sortOrder = 'asc'
      break
    case 'price-desc':
      sortField = 'price'
      sortOrder = 'desc'
      break
    case 'name-asc':
      sortField = 'title'
      sortOrder = 'asc'
      break
    case 'name-desc':
      sortField = 'title'
      sortOrder = 'desc'
      break
    case 'newest':
      sortField = 'createdAt'
      sortOrder = 'desc'
      break
    case 'oldest':
      sortField = 'createdAt'
      sortOrder = 'asc'
      break
  }

  // Fetch products
  const productsResult = await payload.find({
    collection: 'products',
    where,
    sort: `${sortOrder === 'desc' ? '-' : ''}${sortField}`,
    limit,
    page: currentPage,
  })

  // Fetch categories for filters
  const categoriesResult = await payload.find({
    collection: 'product-categories',
    limit: 100,
    sort: 'name',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {dictionary.products?.title || 'Productos'}
        </h1>
        <p className="text-gray-600">
          Descubre nuestra colección de {productsResult.totalDocs} productos
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters
            categories={categoriesResult.docs as ProductCategory[]}
            currentCategory={category}
            currentSort={sort}
            currentSearch={search}
          />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <ProductGrid
            products={productsResult.docs as Product[]}
            pagination={{
              totalPages: productsResult.totalPages,
              currentPage: productsResult.page || 1,
              hasNextPage: productsResult.hasNextPage,
              hasPrevPage: productsResult.hasPrevPage,
            }}
          />
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Explora nuestra colección de productos',
}

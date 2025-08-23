'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ProductCategory } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Search, X, Filter } from 'lucide-react'

interface ProductFiltersProps {
  categories: ProductCategory[]
  currentCategory?: string
  currentSort?: string
  currentSearch?: string
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  currentCategory,
  currentSort = 'createdAt',
  currentSearch = '',
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(currentSearch)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const updateUrl = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    // Reset to page 1 when filters change
    params.delete('page')
    
    router.push(`?${params.toString()}`)
  }

  const handleCategoryChange = (categorySlug: string) => {
    updateUrl({ category: categorySlug === currentCategory ? undefined : categorySlug })
  }

  const handleSortChange = (sort: string) => {
    updateUrl({ sort })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUrl({ search: searchInput || undefined })
  }

  const clearFilters = () => {
    setSearchInput('')
    router.push('/products')
  }

  const hasActiveFilters = currentCategory || currentSearch

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ]

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="destructive" className="ml-2">
              {[currentCategory, currentSearch].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters Content */}
      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Products
          </Label>
          <form onSubmit={handleSearchSubmit} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>

        {/* Sort */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Sort By</Label>
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Categories</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={currentCategory === category.slug}
                    onChange={() => handleCategoryChange(category.slug!)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Active Filters</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find(c => c.slug === currentCategory)?.name}
                  <button
                    onClick={() => handleCategoryChange(currentCategory)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {currentSearch && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {currentSearch}
                  <button
                    onClick={() => {
                      setSearchInput('')
                      updateUrl({ search: undefined })
                    }}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
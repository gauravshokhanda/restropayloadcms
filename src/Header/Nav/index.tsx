'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType, Page } from '@/payload-types'

import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({}) => {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages?limit=10&where[_status][equals]=published')
        if (response.ok) {
          const data = await response.json()
          setPages(data.docs || [])
        }
      } catch (error) {
        console.error('Failed to fetch pages for navigation:', error)
      }
    }

    fetchPages()
  }, [])

  return (
    <nav className="flex gap-3 items-center">
      {pages.map((page) => {
        const href = page.slug === 'home' ? '/' : `/${page.slug}`
        return (
          <Link key={page.id} href={href} className="text-primary hover:underline">
            {page.title}
          </Link>
        )
      })}
      {/* <Link href="/products" className="text-primary hover:underline">
        {dictionary.common.products}
      </Link>
      <Link href="/search">
        <span className="sr-only">{dictionary.common.search}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
      <LanguageSwitcher />
    </nav>
  )
}

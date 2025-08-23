'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CartIcon } from '@/components/Cart/CartIcon'
import { CartDrawer } from '@/components/Cart/CartDrawer'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {data?.logo ? (
              <Media
                resource={data.logo}
                className="h-8 w-auto"
                imgClassName="h-8 w-auto object-contain"
              />
            ) : (
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            )}
            {data?.showSiteName && data?.siteName && (
              <span className="text-xl font-semibold">{data.siteName}</span>
            )}
          </Link>
          <div className="flex items-center space-x-4">
            <HeaderNav data={data} />
            {data?.ctaButton?.show && data?.ctaButton?.link && (
              <CMSLink
                {...data.ctaButton.link}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  data.ctaButton.style === 'primary'
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : data.ctaButton.style === 'secondary'
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              />
            )}
            {(data?.enableCart !== false) && <CartIcon />}
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}

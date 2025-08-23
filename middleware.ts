import { NextRequest, NextResponse } from 'next/server'

// Supported locales
const locales = ['en', 'es', 'hi']
const defaultLocale = 'en'

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return pathname.split('/')[1]
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const langCode = lang.split('-')[0]
        return locales.includes(langCode)
      })
    
    if (preferredLocale) {
      const langCode = preferredLocale.split('-')[0]
      return langCode
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and admin routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname.startsWith('/next/')
  ) {
    return NextResponse.next()
  }

  // Check if there's a locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If no locale in pathname, redirect to default locale (English)
  // For English, we don't add the locale prefix to keep URLs clean
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    
    // For English (default), don't add locale prefix
    if (locale === defaultLocale) {
      const response = NextResponse.next()
      response.headers.set('x-pathname', pathname)
      return response
    }
    
    // For other languages, add locale prefix
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  // If pathname has English locale prefix, redirect to clean URL
  if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
    const newPathname = pathname.replace(`/${defaultLocale}`, '') || '/'
    const newUrl = new URL(newPathname, request.url)
    return NextResponse.redirect(newUrl)
  }

  // Add pathname to headers for server components to access
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|admin|favicon.ico).*)',
  ],
}
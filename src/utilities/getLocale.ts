import { headers } from 'next/headers'
import type { Locale } from '@/payload-types'

const locales: Locale[] = ['en', 'es']
const defaultLocale: Locale = 'en'

export async function getLocale(): Promise<Locale> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  
  // Check if there's a locale in the pathname
  const pathSegments = pathname.split('/')
  const potentialLocale = pathSegments[1] as Locale
  
  if (locales.includes(potentialLocale)) {
    return potentialLocale
  }
  
  // Check Accept-Language header
  const acceptLanguage = headersList.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const langCode = lang.split('-')[0] as Locale
        return locales.includes(langCode)
      })
    
    if (preferredLocale) {
      const langCode = preferredLocale.split('-')[0] as Locale
      if (locales.includes(langCode)) {
        return langCode
      }
    }
  }
  
  return defaultLocale
}

export function getLocaleFromPathname(pathname: string): Locale {
  const pathSegments = pathname.split('/')
  const potentialLocale = pathSegments[1] as Locale
  
  if (locales.includes(potentialLocale)) {
    return potentialLocale
  }
  
  return defaultLocale
}

export { locales, defaultLocale }
export type { Locale }
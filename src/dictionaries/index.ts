import type { Locale } from '@/payload-types'

type Dictionary = {
  common: {
    home: string
    products: string
    search: string
    contact: string
    about: string
    loading: string
    error: string
    notFound: string
    backToHome: string
  }
  navigation: {
    menu: string
    close: string
    language: string
  }
  products: {
    title: string
    featuredProducts: string
    viewAllProducts: string
    productCategories: string
    price: string
    addToCart: string
    outOfStock: string
    inStock: string
    specifications: string
    relatedProducts: string
    description: string
  }
  cart: {
    title: string
    empty: string
    total: string
    checkout: string
    quantity: string
    remove: string
  }
  checkout: {
    title: string
    billingAddress: string
    shippingAddress: string
    paymentMethod: string
    placeOrder: string
    orderSummary: string
  }
  footer: {
    allRightsReserved: string
    privacyPolicy: string
    termsOfService: string
  }
  hero: {
    welcome: string
    subtitle: string
    shopNow: string
    learnMore: string
  }
}

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  es: () => import('./es.json').then((module) => module.default as Dictionary),
  hi: () => import('./hi.json').then((module) => module.default as Dictionary),
} as const

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dictionaryLoader = dictionaries[locale]
  if (!dictionaryLoader) {
    // Fallback to English if locale not found
    return dictionaries.en()
  }
  return dictionaryLoader()
}

export type { Dictionary }
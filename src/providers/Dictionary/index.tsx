'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import type { Dictionary } from '@/dictionaries'

interface DictionaryContextType {
  dictionary: Dictionary
  locale: string
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined)

interface DictionaryProviderProps {
  children: ReactNode
  dictionary: Dictionary
  locale: string
}

export function DictionaryProvider({ children, dictionary, locale }: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const context = useContext(DictionaryContext)
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Globe } from 'lucide-react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ]

export const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Extract current language from pathname
  useEffect(() => {
    const pathSegments = pathname.split('/')
    const langCode = pathSegments[1]
    const foundLanguage = languages.find(lang => lang.code === langCode)
    if (foundLanguage) {
      setCurrentLanguage(foundLanguage)
    } else {
      // If no language code in path, it's English (default)
      setCurrentLanguage(languages.find(lang => lang.code === 'en') || languages[0])
    }
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    setIsOpen(false)
    
    // Get current path without language prefix
    const pathSegments = pathname.split('/')
    const isCurrentlyLocalized = languages.some(lang => lang.code === pathSegments[1])
    const pathWithoutLang = isCurrentlyLocalized ? '/' + pathSegments.slice(2).join('/') : pathname
    
    // Navigate to new language path
    const newPath = language.code === 'en' ? pathWithoutLang : `/${language.code}${pathWithoutLang}`
    router.push(newPath)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-3 ${
                currentLanguage.code === language.code
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {currentLanguage.code === language.code && (
                <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
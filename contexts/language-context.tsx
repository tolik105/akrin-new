"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(() => {
    // Initialize from localStorage or i18n current language
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || i18n.language || 'en'
    }
    return i18n.language || 'en'
  })

  // Sync with i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng)
    }
    
    i18n.on('languageChanged', handleLanguageChange)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


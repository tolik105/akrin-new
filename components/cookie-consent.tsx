"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { X, Cookie } from "lucide-react"
import { cn } from "@/lib/utils"

export function CookieConsent() {
  const { t } = useTranslation('common')
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setShowBanner(true)
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
    
    // Initialize analytics or other cookie-dependent services here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
    
    // Disable analytics or other cookie-dependent services here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
  }

  if (isLoading || !showBanner) return null

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6",
      "animate-in slide-in-from-bottom-5 duration-500"
    )}>
      <Card className="mx-auto max-w-4xl bg-white dark:bg-gray-900 shadow-xl">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('cookies.title', 'We use cookies')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('cookies.description', 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.')}
                  {' '}
                  <Link 
                    href="/cookies" 
                    className="text-purple-600 hover:text-purple-700 underline underline-offset-2"
                  >
                    {t('cookies.learnMore', 'Learn more')}
                  </Link>
                </p>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              onClick={acceptCookies}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              {t('cookies.accept', 'Accept All Cookies')}
            </Button>
            <Button 
              onClick={declineCookies}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {t('cookies.decline', 'Decline Optional Cookies')}
            </Button>
            <Link href="/cookies" className="w-full sm:w-auto">
              <Button 
                variant="ghost"
                className="w-full"
              >
                {t('cookies.customize', 'Cookie Settings')}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
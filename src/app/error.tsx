'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
          Something went wrong!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            size="lg"
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}

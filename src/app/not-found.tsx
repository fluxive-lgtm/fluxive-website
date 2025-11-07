import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-display font-bold gradient-text mb-6">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

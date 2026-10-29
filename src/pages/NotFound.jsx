import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'

export default function NotFound() {
  usePageTitle('Page Not Found')

  return (
    <PageTransition>
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-display text-8xl font-bold text-chrome/20">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Route not in the collection</h1>
        <p className="mt-3 text-muted">The page you requested does not exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Link to="/collection">
            <Button variant="secondary">Browse Collection</Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}

import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import CarCard from '../components/cars/CarCard'
import Button from '../components/ui/Button'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import { useWishlist } from '../context/WishlistContext'
import { getCarById } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Wishlist() {
  usePageTitle('Wishlist')
  const { wishlistIds, clearWishlist } = useWishlist()
  const items = wishlistIds.map(getCarById).filter(Boolean)

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Favorites"
            title="Your Wishlist"
            subtitle="Saved vehicles persist in your browser — revisit, compare, or book a test drive when you're ready."
          />
          {items.length > 0 && (
            <Button variant="ghost" onClick={clearWishlist}>
              Clear wishlist
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted/50" />
            <p className="mt-4 font-display text-xl">Your wishlist is empty</p>
            <p className="mt-2 text-muted">Tap the heart on any car to save it here.</p>
            <Link to="/collection" className="mt-6 inline-block">
              <Button>Explore Cars</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}

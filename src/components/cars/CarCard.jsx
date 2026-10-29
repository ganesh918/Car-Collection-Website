import { motion } from 'framer-motion'
import { Gauge, Heart, Scale, Star, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useComparison } from '../../context/ComparisonContext'
import { useToast } from '../../context/ToastContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice } from '../../data/cars'
import Button from '../ui/Button'
import CarImage from '../ui/CarImage'

export default function CarCard({ car, index = 0 }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare, compareIds, maxCompare } = useComparison()
  const { showToast } = useToast()
  const wishlisted = isWishlisted(car.id)
  const inCompare = isInCompare(car.id)

  const handleWishlist = () => {
    toggleWishlist(car.id)
    showToast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist', 'success')
  }

  const handleCompare = () => {
    if (inCompare) {
      toggleCompare(car.id)
      showToast('Removed from compare')
      return
    }
    if (compareIds.length >= maxCompare) {
      showToast(`Compare list full — replaced oldest vehicle`)
    } else {
      showToast('Added to compare', 'success')
    }
    toggleCompare(car.id)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-surface-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link to={`/cars/${car.id}`}>
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CarImage src={car.image} alt={car.name} className="h-full w-full object-cover" />
          </motion.div>
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent opacity-80" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-void/70 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {car.category}
          </span>
          <span className="rounded-full bg-chrome/20 px-3 py-1 text-xs font-medium text-chrome-light backdrop-blur-sm">
            {car.year}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={handleWishlist}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
              wishlisted ? 'bg-accent text-white' : 'bg-void/60 text-white hover:bg-void/80'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleCompare}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
              inCompare ? 'bg-chrome text-void' : 'bg-void/60 text-white hover:bg-void/80'
            }`}
            aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-chrome">{car.brand}</p>
            <h3 className="font-display text-lg font-bold text-white md:text-xl">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-void/70 px-2 py-1 text-xs backdrop-blur-sm">
            <Star className="h-3 w-3 fill-chrome text-chrome" />
            {car.rating}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 md:p-6">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-white/4 p-2">
            <Zap className="mx-auto mb-1 h-4 w-4 text-chrome" />
            <span className="block font-semibold text-white">{car.horsepower}</span>
            <span className="text-muted">HP</span>
          </div>
          <div className="rounded-xl bg-white/4 p-2">
            <Gauge className="mx-auto mb-1 h-4 w-4 text-chrome" />
            <span className="block font-semibold text-white">{car.acceleration}s</span>
            <span className="text-muted">0-60</span>
          </div>
          <div className="rounded-xl bg-white/4 p-2">
            <span className="mt-1 block font-semibold text-white">{car.topSpeed}</span>
            <span className="text-muted">MPH</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-xl font-bold text-chrome-light">{formatPrice(car.price)}</p>
          <Link to={`/cars/${car.id}`}>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

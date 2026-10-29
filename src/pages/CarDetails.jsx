import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Fuel, Gauge, Heart, Scale, Settings, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import CarImage from '../components/ui/CarImage'
import PageTransition from '../components/ui/PageTransition'
import { useComparison } from '../context/ComparisonContext'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice, getCarById } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'

export default function CarDetails() {
  const { id } = useParams()
  const car = getCarById(id)
  usePageTitle(car?.name ?? 'Vehicle Details')
  const [activeImage, setActiveImage] = useState(0)
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isInCompare, toggleCompare } = useComparison()

  if (!car) return <Navigate to="/collection" replace />

  const wishlisted = isWishlisted(car.id)
  const inCompare = isInCompare(car.id)

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8 lg:py-14">
        <Link
          to="/collection"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-chrome-light"
        >
          <ArrowLeft className="h-4 w-4" /> Back to collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="overflow-hidden rounded-3xl border border-white/8"
            >
              <CarImage
                src={car.gallery[activeImage]}
                alt={car.name}
                className="aspect-[16/10] w-full object-cover"
              />
            </motion.div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {car.gallery.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    activeImage === i ? 'border-chrome' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <CarImage src={img} alt="" className="aspect-video w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-chrome">{car.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl lg:text-5xl">{car.name}</h1>
            <p className="mt-2 text-lg text-muted">{car.tagline}</p>
            <p className="mt-6 font-display text-3xl font-bold text-chrome-light">{formatPrice(car.price)}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => toggleWishlist(car.id)} variant={wishlisted ? 'accent' : 'secondary'}>
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
                {wishlisted ? 'Saved' : 'Wishlist'}
              </Button>
              <Button onClick={() => toggleCompare(car.id)} variant={inCompare ? 'primary' : 'outline'}>
                <Scale className="h-4 w-4" />
                {inCompare ? 'In Compare' : 'Compare'}
              </Button>
              <Link to="/book-test-drive" state={{ carId: car.id, carName: car.name }}>
                <Button variant="accent">Book Test Drive</Button>
              </Link>
            </div>

            <p className="mt-8 leading-relaxed text-muted">{car.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Zap, label: 'Power', value: `${car.horsepower} HP` },
                { icon: Gauge, label: '0-60 mph', value: `${car.acceleration}s` },
                { icon: Settings, label: 'Drivetrain', value: car.drivetrain },
                { icon: Fuel, label: 'Fuel', value: car.fuelType },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-surface-elevated p-4 text-center">
                  <Icon className="mx-auto h-5 w-5 text-chrome" />
                  <p className="mt-2 text-xs text-muted">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {car.features.map((f) => (
                <li key={f} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-16 rounded-3xl border border-white/8 bg-surface-elevated p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Full Specifications</h2>
          <p className="mt-2 text-muted">Engineered details for the discerning buyer.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Engine', car.specs.engine],
              ['Torque', car.specs.torque],
              ['Transmission', car.transmission],
              ['Top Speed', `${car.topSpeed} mph`],
              ['Curb Weight', car.specs.weight],
              ['Length', car.specs.length],
              ['Width', car.specs.width],
              ['Height', car.specs.height],
              ['Cargo', car.specs.cargo],
              ['Seats', `${car.seats} seats`],
              ['Model Year', car.year],
              ['Category', car.category],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-white/8 py-3 text-sm"
              >
                <span className="text-muted">{label}</span>
                <span className="max-w-[55%] text-right font-medium">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4 text-chrome" />
          Available for immediate test drive scheduling
        </div>
      </div>
    </PageTransition>
  )
}

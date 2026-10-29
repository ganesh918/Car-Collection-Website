import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import CarCard from '../components/cars/CarCard'
import AnimatedSection from '../components/ui/AnimatedSection'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import CarImage from '../components/ui/CarImage'
import { brandMeta, cars, categoryMeta } from '../data/cars'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Brands() {
  usePageTitle('Brands & Categories')
  const [params] = useSearchParams()
  const selectedBrand = params.get('brand')

  const brandCars = selectedBrand
    ? cars.filter((c) => c.brand === selectedBrand)
    : []

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Brands & Categories"
          title="World-Class Marques & Segments"
          subtitle="Explore by manufacturer heritage or vehicle class — each path leads to exceptional machinery."
        />

        <h3 className="mb-6 font-display text-xl font-semibold">Browse by Brand</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brandMeta.map((brand, i) => (
            <AnimatedSection key={brand.name} delay={i * 0.04}>
              <Link to={`/brands?brand=${encodeURIComponent(brand.name)}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`overflow-hidden rounded-2xl border transition ${
                    selectedBrand === brand.name
                      ? 'border-chrome ring-2 ring-chrome/30'
                      : 'border-white/8 hover:border-chrome/40'
                  }`}
                >
                  <div className="relative h-36">
                    <CarImage src={brand.image} alt={brand.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-void/50" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display font-bold">{brand.name}</p>
                      <p className="text-xs text-muted">{brand.count} models</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <h3 className="mb-6 mt-16 font-display text-xl font-semibold">Browse by Category</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryMeta.map((cat) => (
            <Link
              key={cat.name}
              to={`/collection?category=${encodeURIComponent(cat.name)}`}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-surface-elevated p-5 transition hover:border-chrome/40"
            >
              <div>
                <p className="font-display text-lg font-bold">{cat.name}</p>
                <p className="text-sm text-muted">{cat.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-chrome" />
            </Link>
          ))}
        </div>

        {selectedBrand && (
          <div className="mt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-chrome">Selected brand</p>
                <h3 className="font-display text-2xl font-bold">{selectedBrand}</h3>
              </div>
              <Link to="/brands" className="text-sm text-muted hover:text-white">
                Clear selection
              </Link>
            </div>
            {brandCars.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {brandCars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted">No models listed for this brand.</p>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  )
}

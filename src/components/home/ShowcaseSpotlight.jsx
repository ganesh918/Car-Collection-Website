import { motion } from 'framer-motion'
import { ArrowRight, Gauge, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, getCarById } from '../../data/cars'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'
import CarImage from '../ui/CarImage'

const spotlight = getCarById('ferrari-296-gtb')

export default function ShowcaseSpotlight() {
  if (!spotlight) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <AnimatedSection>
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface-elevated">
          <div className="grid lg:grid-cols-12">
            <div className="relative lg:col-span-7">
              <CarImage
                src={spotlight.image}
                alt={spotlight.name}
                className="h-full min-h-[320px] w-full object-cover lg:min-h-[520px]"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-surface-elevated/90 lg:to-surface-elevated" />
              <div className="absolute left-6 top-6 rounded-full border border-chrome/40 bg-void/60 px-4 py-1.5 text-xs uppercase tracking-wider text-chrome-light backdrop-blur-sm">
                Editor&apos;s Choice
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
              <p className="text-sm uppercase tracking-[0.2em] text-chrome">{spotlight.brand}</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{spotlight.name}</h2>
              <p className="mt-4 text-muted">{spotlight.tagline}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/70">{spotlight.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm">
                  <Zap className="h-4 w-4 text-chrome" />
                  <span>{spotlight.horsepower} HP</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm">
                  <Gauge className="h-4 w-4 text-chrome" />
                  <span>{spotlight.acceleration}s 0–60</span>
                </div>
              </div>

              <p className="mt-8 font-display text-3xl font-bold text-chrome-light">
                {formatPrice(spotlight.price)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/cars/${spotlight.id}`}>
                  <Button>
                    View Full Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/book-test-drive" state={{ carId: spotlight.id, carName: spotlight.name }}>
                  <Button variant="secondary">Book Test Drive</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

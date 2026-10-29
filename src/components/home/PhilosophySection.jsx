import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { carImages } from '../../data/images'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'
import CarImage from '../ui/CarImage'

const pillars = [
  {
    title: 'Provenance First',
    text: 'Documented history, verified mileage, and transparent condition reports on every listing.',
  },
  {
    title: 'White-Glove Service',
    text: 'Dedicated advisors, private viewings, and concierge delivery tailored to your calendar.',
  },
  {
    title: 'Curated, Never Crowded',
    text: 'A focused inventory of exceptional machines — quality over quantity, always.',
  },
]

export default function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-void py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 hero-grain opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-chrome/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Section index bar */}
        <AnimatedSection className="mb-14 flex items-center gap-6 lg:mb-20">
          <span className="font-display text-sm font-bold tracking-[0.3em] text-chrome/80">01</span>
          <div className="h-px flex-1 bg-linear-to-r from-chrome/50 via-white/10 to-transparent" />
          <p className="hidden text-xs uppercase tracking-[0.28em] text-muted sm:block">Est. 2018 · Beverly Hills</p>
        </AnimatedSection>

        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Editorial image stack */}
          <AnimatedSection className="relative lg:col-span-5 xl:col-span-5">
            <div className="absolute -left-3 top-8 bottom-8 w-px bg-linear-to-b from-transparent via-chrome/40 to-transparent lg:-left-6" />
            <div className="relative pl-4 lg:pl-8">
              <div className="relative overflow-hidden rounded-sm border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />
                <CarImage
                  src={carImages.luxury1}
                  alt="Luxury automotive craftsmanship"
                  className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
                />
                <div className="absolute inset-0 z-10 bg-linear-to-t from-void via-void/20 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-8 -right-2 z-20 w-[46%] overflow-hidden rounded-sm border border-chrome/25 shadow-2xl sm:-right-6 md:w-[42%]"
              >
                <CarImage
                  src={carImages.supercar2}
                  alt="Supercar detail"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />
              </motion.div>

              <div className="absolute -top-4 right-4 z-20 hidden rounded-sm border border-chrome/30 bg-void/90 px-4 py-3 backdrop-blur-md sm:block">
                <p className="text-[10px] uppercase tracking-[0.25em] text-chrome">Private Gallery</p>
                <p className="mt-0.5 font-display text-sm font-semibold text-white">By invitation</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="relative z-10 mt-14 flex items-stretch gap-0 overflow-hidden rounded-sm border border-white/10 bg-surface-elevated/90 backdrop-blur-sm"
            >
              <div className="flex w-14 shrink-0 items-center justify-center bg-chrome/10 text-chrome">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col justify-center px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-chrome">
                    Beverly Hills Showroom
                  </p>
                  <p className="mt-1 font-display text-base font-bold text-white md:text-lg">
                    By appointment, seven days a week
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-chrome-light transition hover:text-chrome sm:mt-0"
                >
                  Directions <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Copy + pillars */}
          <AnimatedSection delay={0.06} className="lg:col-span-7 lg:pt-6 xl:col-span-7">
            <div className="max-w-xl lg:max-w-none">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-chrome">Our Philosophy</p>
              <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                Where automotive art meets
                <span className="mt-2 block text-gradient-gold">uncompromising trust</span>
              </h2>
              <p className="mt-8 max-w-lg text-base leading-[1.75] text-white/55 md:text-lg">
                Velvet Motors was built for collectors and first-time supercar buyers alike — people who want the
                thrill of the drive without the uncertainty of the market.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                We combine immersive digital tools with the intimacy of a private gallery, so every decision feels
                considered, never rushed.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-5">
              {pillars.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col border border-white/8 bg-surface/80 p-5 transition duration-500 hover:border-chrome/35 hover:bg-surface-elevated lg:p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-display text-3xl font-bold leading-none text-chrome/25 transition group-hover:text-chrome/45">
                      0{i + 1}
                    </span>
                    <span className="h-px w-8 bg-chrome/30 transition group-hover:w-12 group-hover:bg-chrome/60" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/8 pt-10 lg:mt-14">
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Discover Our Story
                </Button>
              </Link>
              <Link
                to="/collection"
                className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-chrome-light"
              >
                Explore the collection
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

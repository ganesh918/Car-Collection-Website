import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../../data/cars'
import AnimatedSection from '../ui/AnimatedSection'
import CarImage from '../ui/CarImage'
import SectionHeading from '../ui/SectionHeading'

export default function CategoriesSection() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Find Your Perfect Class"
          subtitle="From whisper-quiet luxury to spine-tingling supercars — browse by the driving experience you crave."
          align="center"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryMeta.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.08}>
              <Link to={`/collection?category=${encodeURIComponent(cat.name)}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-80 overflow-hidden rounded-3xl border border-white/8"
                >
                  <CarImage
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-void via-void/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold">{cat.name}</h3>
                    <p className="mt-1 text-sm text-muted">{cat.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-chrome-light opacity-0 transition group-hover:opacity-100">
                      Browse {cat.name} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

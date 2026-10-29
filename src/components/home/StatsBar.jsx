import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { inventoryStats } from '../../data/cars'
import AnimatedSection from '../ui/AnimatedSection'

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const stats = [
    { value: String(inventoryStats.vehicles), label: 'Showroom Models' },
    { value: String(inventoryStats.brands), label: 'Premium Marques' },
    { value: String(inventoryStats.categories), label: 'Vehicle Classes' },
    { value: '4.9', label: 'Avg. Client Rating' },
  ]

  return (
    <section className="relative -mt-16 z-10 px-4 md:px-6 lg:px-8">
      <AnimatedSection>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-surface-elevated/90 p-6 backdrop-blur-xl md:grid-cols-4 md:gap-6 md:p-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-chrome-light md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  )
}

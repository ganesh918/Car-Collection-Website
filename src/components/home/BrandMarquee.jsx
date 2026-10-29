import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brandMeta } from '../../data/cars'

const brands = brandMeta.map((b) => b.name)

export default function BrandMarquee() {
  const doubled = [...brands, ...brands]

  return (
    <section className="overflow-hidden border-y border-white/8 py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted">Trusted Marques</p>
      <div className="relative flex">
        <motion.div
          className="flex shrink-0 gap-12 whitespace-nowrap px-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((brand, i) => (
            <Link
              key={`${brand}-${i}`}
              to={`/brands?brand=${encodeURIComponent(brand)}`}
              className="font-display text-xl text-white/40 transition hover:text-chrome md:text-2xl"
            >
              {brand}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

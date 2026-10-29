import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { carImages } from '../../data/images'
import Button from '../ui/Button'
import CarImage from '../ui/CarImage'

const easeOut = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25,
    restDelta: 0.0005,
  })

  const bgY = useTransform(smoothProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '18%'])
  const contentY = useTransform(smoothProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '8%'])
  const contentOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0.15])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform [transform:translateZ(0)]"
      >
        <motion.div
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 1.8, ease: easeOut }}
          className="absolute inset-0"
        >
          <CarImage
            src={carImages.hero}
            alt="Supercar cinematic hero"
            loading="eager"
            className="h-[115%] w-full object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div className="hero-grain pointer-events-none absolute inset-0 bg-void/55" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-void via-void/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-transparent to-void/40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-28 will-change-transform md:px-6 lg:px-8"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: easeOut }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-chrome/30 bg-chrome/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-chrome-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chrome" />
            Premium Automotive Collection 2025
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Drive the <span className="text-gradient-gold">Extraordinary</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Discover hand-selected luxury, sports, SUV, and supercar masterpieces — engineered for emotion,
            curated for connoisseurs.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/collection">
              <Button size="lg">Explore Collection</Button>
            </Link>
            <Link to="/book-test-drive">
              <Button variant="secondary" size="lg">
                <Play className="h-4 w-4 fill-current" />
                Book Test Drive
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: easeOut }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: easeOut }}
          className="absolute bottom-8 right-4 hidden w-72 rounded-2xl glass p-5 lg:block xl:right-8"
        >
          <p className="text-xs uppercase tracking-wider text-chrome">Featured This Week</p>
          <p className="mt-2 font-display text-lg font-bold">Porsche 911 Turbo S</p>
          <p className="mt-1 text-sm text-muted">640 HP · 2.6s to 60 · AWD</p>
          <Link to="/cars/porsche-911-turbo-s" className="mt-4 inline-block text-sm text-chrome-light hover:underline">
            View specifications →
          </Link>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-void to-transparent" />
    </section>
  )
}

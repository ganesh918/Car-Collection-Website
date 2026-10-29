import { motion } from 'framer-motion'
import { Calendar, Compass, Key, Scale } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../ui/AnimatedSection'
import SectionHeading from '../ui/SectionHeading'

const steps = [
  {
    icon: Compass,
    title: 'Explore',
    text: 'Browse the collection with search, filters, and immersive detail pages.',
    link: '/collection',
    cta: 'View inventory',
  },
  {
    icon: Scale,
    title: 'Compare',
    text: 'Evaluate up to three vehicles side-by-side on performance and specifications.',
    link: '/compare',
    cta: 'Open compare tool',
  },
  {
    icon: Calendar,
    title: 'Experience',
    text: 'Schedule a private test drive at our showroom, track, or via concierge.',
    link: '/book-test-drive',
    cta: 'Book a session',
  },
  {
    icon: Key,
    title: 'Own',
    text: 'Finalize purchase, financing, or trade-in with a dedicated Velvet advisor.',
    link: '/enquiry',
    cta: 'Start enquiry',
  },
]

export default function JourneySection() {
  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Velvet Journey"
          title="From first glance to keys in hand"
          subtitle="A refined four-step path designed for clarity, discretion, and confidence at every stage."
          align="center"
        />
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-linear-to-r from-transparent via-chrome/30 to-transparent lg:block" />
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="relative h-full rounded-3xl border border-white/8 bg-surface-elevated p-6 transition hover:border-chrome/30"
              >
                <span className="absolute -top-3 left-6 rounded-full bg-chrome px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-void">
                  Step {i + 1}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-chrome/10 text-chrome">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                <Link
                  to={step.link}
                  className="mt-6 inline-block text-sm font-medium text-chrome-light transition hover:text-chrome"
                >
                  {step.cta} →
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

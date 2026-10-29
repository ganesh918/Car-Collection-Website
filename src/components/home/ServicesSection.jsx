import { motion } from 'framer-motion'
import { Gem, Globe2, RefreshCw, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../ui/AnimatedSection'
import SectionHeading from '../ui/SectionHeading'

const services = [
  {
    icon: Gem,
    title: 'Concierge Acquisition',
    text: 'Bespoke sourcing for rare specifications, colors, and limited allocations worldwide.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Inspection',
    text: '200-point mechanical and cosmetic assessment with full digital report before you commit.',
  },
  {
    icon: RefreshCw,
    title: 'Trade-In & Consignment',
    text: 'Fair market appraisals and discreet consignment for collectors upgrading their stable.',
  },
  {
    icon: Globe2,
    title: 'Global Delivery',
    text: 'Enclosed transport and international logistics handled end-to-end by our partners.',
  },
]

export default function ServicesSection() {
  return (
    <section className="border-y border-white/6 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Beyond the Showroom"
          title="Services worthy of the vehicles we represent"
          subtitle="Every touchpoint is designed to feel personal, private, and impeccably executed."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group h-full rounded-3xl border border-white/8 bg-void/40 p-6 transition hover:border-chrome/35 hover:bg-void/70"
              >
                <service.icon className="h-7 w-7 text-chrome transition group-hover:scale-110" />
                <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-12 text-center">
          <Link to="/contact" className="text-sm text-chrome-light underline-offset-4 hover:underline">
            Speak with a senior advisor →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

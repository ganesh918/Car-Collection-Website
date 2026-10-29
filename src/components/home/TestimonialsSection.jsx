import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import SectionHeading from '../ui/SectionHeading'

const testimonials = [
  {
    quote:
      'Velvet made acquiring my first supercar feel effortless. The comparison tools and private test drive were world-class.',
    name: 'Alexander Chen',
    role: 'Collector · San Francisco',
    initials: 'AC',
  },
  {
    quote:
      'Transparency on condition and history gave me complete confidence. Delivery was wrapped like a work of art.',
    name: 'Priya Sharma',
    role: 'Entrepreneur · Dubai',
    initials: 'PS',
  },
  {
    quote:
      'Their team sourced an exact spec Bentley within weeks. True concierge service — not a transaction.',
    name: 'James Whitmore',
    role: 'CEO · London',
    initials: 'JW',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="Client Voices"
        title="Trusted by discerning drivers worldwide"
        subtitle="A selection of experiences from clients who expect nothing less than exceptional."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <motion.blockquote
              whileHover={{ y: -4 }}
              className="relative flex h-full flex-col rounded-3xl border border-white/8 bg-surface-elevated p-8"
            >
              <Quote className="h-8 w-8 text-chrome/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/85 md:text-base">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-chrome/15 font-display text-sm font-bold text-chrome-light">
                  {t.initials}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-white">{t.name}</cite>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}

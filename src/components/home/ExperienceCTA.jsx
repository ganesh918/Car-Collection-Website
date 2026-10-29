import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { carImages } from '../../data/images'
import Button from '../ui/Button'
import CarImage from '../ui/CarImage'
import AnimatedSection from '../ui/AnimatedSection'

export default function ExperienceCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
      <AnimatedSection>
        <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.85)] md:min-h-[500px]">
          {/* Same cinematic treatment as the home hero */}
          <CarImage
            src={carImages.ctaExperience}
            alt="Modern luxury performance car"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-[68%_center] md:object-[72%_center]"
          />
          <div className="hero-grain absolute inset-0 bg-void/50" />
          <div className="absolute inset-0 bg-linear-to-r from-void via-void/88 to-void/20 md:via-void/78" />
          <div className="absolute inset-0 bg-linear-to-t from-void via-transparent to-void/35" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[440px] flex-col justify-center p-8 md:min-h-[500px] md:p-14 lg:max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-chrome">Velvet Experience</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] md:text-4xl lg:text-5xl">
              Your journey begins with a single test drive
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              Schedule a private session on track or open road. Our specialists tailor every detail — route, vehicle
              pairing, and post-drive consultation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book-test-drive">
                <Button size="lg">Schedule Test Drive</Button>
              </Link>
              <Link to="/enquiry">
                <Button variant="secondary" size="lg">
                  General Enquiry
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="absolute bottom-8 right-6 hidden rounded-2xl glass p-5 lg:block xl:right-10">
            <p className="text-xs uppercase tracking-wider text-chrome">Private Sessions</p>
            <p className="mt-2 font-display text-lg font-bold">Track & open road</p>
            <p className="mt-1 text-sm text-muted">Concierge scheduling · 7 days a week</p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

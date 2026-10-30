import { carImages } from '../data/images'
import { usePageTitle } from '../hooks/usePageTitle'
import AnimatedSection from '../components/ui/AnimatedSection'
import CarImage from '../components/ui/CarImage'
import PageTransition from '../components/ui/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'

const values = [
  {
    title: 'Curated Excellence',
    text: 'Every vehicle passes a 200-point inspection and provenance review before joining our showroom floor.',
  },
  {
    title: 'Transparent Journey',
    text: 'Clear pricing, documented history, and dedicated advisors from first enquiry to final handover.',
  },
  {
    title: 'Experience First',
    text: 'Private test drives, track days, and concierge delivery designed around your schedule.',
  },
]

const timeline = [
  { year: '2018', event: 'Velvet Motors founded in Beverly Hills' },
  { year: '2020', event: 'Expanded to 50+ marques and launched digital showroom' },
  { year: '2023', event: 'Opened private track partnership for client experiences' },
  { year: '2025', event: '150+ vehicles and global sourcing network' },
]

export default function About() {
  usePageTitle('About Us')
  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-[420px]">
          <CarImage src={carImages.luxury1} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-b from-void/80 to-void" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="About Us"
            title="Crafting Automotive Desire Since 2018"
            subtitle="Velvet Motors is a boutique collective of enthusiasts, engineers, and hospitality professionals united by one mission: elevate how the world discovers exceptional cars."
          />

          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <AnimatedSection>
              <p className="leading-relaxed text-muted">
                We began as a small studio showcasing a handful of European grand tourers. Today, our clients span
                collectors, first-time supercar buyers, and fleet curators — all seeking authenticity, discretion, and
                vehicles that inspire.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Our showroom blends physical craftsmanship with digital tools: immersive galleries, side-by-side
                comparison, and seamless test drive scheduling — without losing the warmth of human expertise.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {values.map((v) => (
                  <div key={v.title} className="rounded-2xl border border-white/8 bg-surface-elevated p-5">
                    <h3 className="font-display text-lg font-bold text-chrome-light">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted">{v.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-20">
            <h2 className="font-display text-2xl font-bold">Our Journey</h2>
            <div className="mt-8 space-y-6 border-l border-chrome/30 pl-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full bg-chrome" />
                  <p className="text-sm font-semibold text-chrome">{item.year}</p>
                  <p className="text-muted">{item.event}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  )
}

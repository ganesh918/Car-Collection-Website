import AnimatedSection from '../ui/AnimatedSection'

const mentions = ['Robb Report', 'Top Gear', 'Car & Driver', 'Motor Trend', 'DuPont Registry']

export default function PressStrip() {
  return (
    <section className="border-b border-white/6 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <AnimatedSection>
          <p className="mb-8 text-center text-xs uppercase tracking-[0.35em] text-muted">Recognized By</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
            {mentions.map((name) => (
              <span
                key={name}
                className="font-display text-lg text-white/25 transition hover:text-chrome/60 md:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

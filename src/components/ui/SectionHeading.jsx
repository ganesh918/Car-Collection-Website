import AnimatedSection from './AnimatedSection'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', dark = true }) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'

  return (
    <AnimatedSection className={`mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-chrome">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-void'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${dark ? 'text-muted' : 'text-void/70'}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}

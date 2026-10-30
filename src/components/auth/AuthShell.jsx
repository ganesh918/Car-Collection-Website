import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthTrustStrip from './AuthTrustStrip'

const highlights = [
  'Sync wishlists & comparisons instantly',
  'Priority private test drive scheduling',
  'Early access to new arrivals',
]

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  cardBody,
  footer,
  showTrust = true,
  compact = false,
}) {
  const padding = compact ? 'px-5 pt-4 pb-5 md:px-6 md:pb-6' : 'p-6 md:p-8 lg:p-9'

  const staticBody = (
    <>
      {!compact && eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome">{eyebrow}</p>
      )}
      <h1
        className={`font-display font-bold tracking-tight ${compact ? 'text-2xl' : 'mt-2 text-3xl'}`}
      >
        {title}
      </h1>
      {!compact && subtitle && <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>}
      <div className={compact ? 'mt-4' : 'mt-8'}>{children}</div>
      {footer && (
        <div
          className={`border-t border-white/8 text-center text-sm text-muted ${compact ? 'mt-5 pt-4' : 'mt-8 pt-6'}`}
        >
          {footer}
        </div>
      )}
      {showTrust && !compact && <AuthTrustStrip />}
    </>
  )

  const authCardBody = <div className="space-y-0">{cardBody}</div>

  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] pb-10 lg:min-h-[calc(100vh-6rem)] lg:pb-12">
      <section className="relative hidden flex-1 flex-col justify-center px-10 py-12 xl:px-14 xl:py-16 lg:flex">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-chrome">Velvet Access</p>
          <p className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white xl:text-5xl">
            The showroom, <span className="text-gradient-gold">in your pocket</span>
          </p>
          <ul className="mt-10 space-y-4">
            {highlights.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-white/75"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-chrome/30 bg-chrome/10 text-[10px] font-bold text-chrome">
                  {i + 1}
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          <blockquote className="mt-12 max-w-md rounded-2xl border border-white/10 bg-void/45 p-6 backdrop-blur-md">
            <Quote className="h-5 w-5 text-chrome/80" />
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Velvet turned my wishlist into a curated shortlist. Booking a test drive took less than a minute.
            </p>
            <footer className="mt-4 text-xs uppercase tracking-wider text-chrome/90">— M. Laurent, Member since 2024</footer>
          </blockquote>
        </motion.div>

        <p className="absolute bottom-8 left-10 text-[11px] text-white/35 xl:left-14">
          Demo auth — data stays in your browser for this assignment.
        </p>
      </section>

      <section className="flex w-full shrink-0 flex-col justify-center px-4 sm:px-6 md:items-center md:px-8 lg:items-stretch lg:w-[min(100%,520px)] lg:max-w-[520px] lg:px-10 xl:w-[480px] xl:pr-14">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[440px] md:max-w-[420px] lg:ml-auto lg:mr-0 lg:max-w-none"
        >
          <div className="auth-panel-ring rounded-[1.75rem] p-[2px]">
            <div className="auth-panel overflow-hidden rounded-[1.65rem] border border-white/10 bg-surface-elevated/95 shadow-[0_32px_100px_rgba(0,0,0,0.65)] backdrop-blur-xl">
              <div className="h-px w-full bg-linear-to-r from-transparent via-chrome/90 to-transparent" />
              <div className={padding}>{cardBody ? authCardBody : staticBody}</div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/40 md:text-center lg:text-right">
            Need help?{' '}
            <Link to="/contact" className="text-chrome-light/80 transition hover:text-chrome">
              Contact concierge
            </Link>
          </p>
        </motion.div>
      </section>
    </div>
  )
}

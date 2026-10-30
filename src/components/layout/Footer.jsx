import { ArrowUpRight, Globe, Mail, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../ui/AnimatedSection'

const footerLinks = {
  Explore: [
    { label: 'Collection', to: '/collection' },
    { label: 'Brands & Categories', to: '/brands' },
    { label: 'Compare Cars', to: '/compare' },
    { label: 'Wishlist', to: '/wishlist' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Enquiry', to: '/enquiry' },
    { label: 'Sign In', to: '/login' },
    { label: 'Create Account', to: '/signup' },
  ],
  Services: [
    { label: 'Book Test Drive', to: '/book-test-drive' },
    { label: 'Financing', to: '/contact' },
    { label: 'Trade-In', to: '/enquiry' },
    { label: 'Concierge', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-surface">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-chrome/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-20">
        <AnimatedSection className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-chrome/40 bg-chrome/10 font-display font-bold text-chrome">
                V
              </span>
              <div>
                <div className="font-display text-xl font-bold">Velvet Motors</div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">Since 2018</div>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Curating the world&apos;s most desirable automobiles — luxury sedans, sports icons, commanding SUVs,
              and limited supercars — with white-glove service from discovery to delivery.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-chrome" />
                88 Horizon Drive, Beverly Hills, CA 90210
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-chrome" />
                +1 (800) 555-0199
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-chrome" />
                concierge@velvetmotors.com
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Share2, MessageCircle, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-chrome/40 hover:text-chrome-light"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-sm text-muted transition hover:text-chrome-light"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Velvet Motors. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

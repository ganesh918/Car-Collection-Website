import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Scale, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useComparison } from '../../context/ComparisonContext'
import { useWishlist } from '../../context/WishlistContext'
import VelvetLogoMark from '../brand/VelvetLogoMark'
import Button from '../ui/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/brands', label: 'Brands' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()
  const { wishlistIds } = useWishlist()
  const { compareIds } = useComparison()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6 lg:h-20 lg:px-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="logo-mark relative flex shrink-0 items-center justify-center transition duration-500 group-hover:scale-[1.04]">
              <VelvetLogoMark className="h-10 w-10" />
            </span>
            <div className="leading-tight">
              <span className="font-display text-lg font-bold tracking-wide text-white">Velvet</span>
              <span className="block text-[10px] uppercase tracking-[0.35em] text-muted">Motors</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? 'bg-white/10 text-chrome-light' : 'text-muted hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-chrome/40 hover:text-chrome-light"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              )}
            </Link>
            <Link
              to="/compare"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-chrome/40 hover:text-chrome-light sm:flex"
              aria-label="Compare"
            >
              <Scale className="h-4 w-4" />
              {compareIds.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-chrome px-1 text-[10px] font-bold text-void">
                  {compareIds.length}
                </span>
              )}
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-muted transition hover:border-chrome/40 hover:text-chrome-light sm:inline-flex"
              aria-label={isAuthenticated ? 'My account' : 'Sign in'}
            >
              <User className="h-4 w-4 shrink-0" />
              <span className="max-w-[7rem] truncate">{isAuthenticated ? user?.fullName?.split(' ')[0] : 'Sign in'}</span>
            </Link>
            <Link to="/book-test-drive" className="nav-spin-border hidden md:inline-flex">
              <Button as="span" size="sm" className="relative z-20">
                Book Test Drive
              </Button>
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-4 font-display text-2xl ${
                          isActive ? 'text-chrome-light' : 'text-white/80'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Link to={isAuthenticated ? '/account' : '/login'}>
                  <Button variant="ghost" className="w-full justify-start gap-2 border border-white/10">
                    <User className="h-4 w-4" />
                    {isAuthenticated ? `Account (${user?.fullName?.split(' ')[0]})` : 'Sign in / Register'}
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button variant="secondary" className="w-full">
                    Wishlist ({wishlistIds.length})
                  </Button>
                </Link>
                <Link to="/book-test-drive" className="nav-spin-border nav-spin-border--block">
                  <Button as="span" className="relative z-20 w-full">
                    Book Test Drive
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

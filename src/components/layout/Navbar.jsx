import { AnimatePresence, motion } from 'framer-motion'
import { Heart, LogOut, Menu, Scale, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useComparison } from '../../context/ComparisonContext'
import { useWishlist } from '../../context/WishlistContext'
import VelvetLogoMark from '../brand/VelvetLogoMark'
import Button from '../ui/Button'
import UserProfileMenu from './UserProfileMenu'

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
  const { user, isAuthenticated, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
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

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 transition-all duration-500 ${
          open ? 'z-[70]' : 'z-50'
        } ${scrolled || open ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}
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
            <UserProfileMenu />
            <Link to="/book-test-drive" className="nav-spin-border hidden md:inline-flex">
              <Button as="span" size="sm" className="relative z-20">
                Book Test Drive
              </Button>
            </Link>
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-white transition lg:hidden ${
                open
                  ? 'border-chrome/50 bg-white/10 text-chrome-light'
                  : 'border-white/10'
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            onClick={(event) => {
              if (event.target === event.currentTarget) closeMenu()
            }}
          >
            <div className="relative flex h-full flex-col p-6 pt-24">
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6">
                <span className="font-display text-xl font-bold text-white">Menu</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Tap outside or press Esc</span>
              </div>
              <nav className="mt-4 flex flex-1 flex-col justify-center gap-2">
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
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-4 text-center font-display text-2xl ${
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
                <Button variant="ghost" className="w-full border border-white/10" onClick={closeMenu}>
                  Close menu
                </Button>
                {!isAuthenticated && (
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start gap-2 border border-white/10">
                      <User className="h-4 w-4" />
                      Sign in / Register
                    </Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Button
                    variant="secondary"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      closeMenu()
                      logout()
                      showToast('Signed out successfully.', 'success')
                      navigate('/', { replace: true })
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                )}
                <Link to="/wishlist" onClick={closeMenu}>
                  <Button variant="secondary" className="w-full">
                    Wishlist ({wishlistIds.length})
                  </Button>
                </Link>
                <Link to="/book-test-drive" className="nav-spin-border nav-spin-border--block" onClick={closeMenu}>
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

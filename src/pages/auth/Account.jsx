import { ArrowLeft, Calendar, Heart, LogOut, Scale, Sparkles, User, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import PageTransition from '../../components/ui/PageTransition'
import RequireAuth from '../../components/auth/RequireAuth'
import { useAuth } from '../../context/AuthContext'
import { useComparison } from '../../context/ComparisonContext'
import { useWishlist } from '../../context/WishlistContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useToast } from '../../context/ToastContext'

function AccountContent() {
  usePageTitle('My Account')
  const { user, logout } = useAuth()
  const { wishlistIds } = useWishlist()
  const { compareIds } = useComparison()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    showToast('Signed out successfully.', 'success')
    navigate('/', { replace: true })
  }

  const handleClose = useCallback(() => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handleClose])

  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const shortcuts = [
    { to: '/wishlist', icon: Heart, label: 'Wishlist', detail: `${wishlistIds.length} saved` },
    { to: '/compare', icon: Scale, label: 'Compare', detail: `${compareIds.length} vehicles` },
    { to: '/book-test-drive', icon: Calendar, label: 'Test drive', detail: 'Book a session' },
    { to: '/collection', icon: Sparkles, label: 'Collection', detail: 'Browse inventory' },
  ]

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:py-16">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface-elevated">
          <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4 md:px-8">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-muted transition hover:border-chrome/40 hover:text-chrome-light"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              Back
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close account"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-chrome/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="h-1 bg-linear-to-r from-transparent via-chrome to-transparent" />
          <div className="border-b border-white/8 bg-linear-to-br from-chrome/10 to-transparent p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-chrome/40 bg-void font-display text-xl font-bold text-chrome-light">
                {initials}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-chrome">Member</p>
                <h1 className="mt-1 font-display text-3xl font-bold">{user.fullName}</h1>
                <p className="mt-1 text-sm text-muted">{user.email}</p>
              </div>
              <Button variant="secondary" className="ml-auto gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 md:p-8">
            {shortcuts.map(({ to, icon: Icon, label, detail }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-surface/60 p-5 transition hover:border-chrome/30 hover:bg-surface"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-chrome transition group-hover:border-chrome/40">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-white">{label}</p>
                  <p className="text-sm text-muted">{detail}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/8 px-6 py-6 md:px-8">
            <div className="flex items-start gap-3 text-sm text-muted">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-chrome" />
              <p>
                Profile data is stored in your browser for this demo. Connect a real backend later for secure
                authentication and synced garage data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default function Account() {
  return (
    <RequireAuth>
      <AccountContent />
    </RequireAuth>
  )
}

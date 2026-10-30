import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LogOut, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function UserProfileMenu() {
  const [open, setOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (!isAuthenticated || !user) {
    return (
      <Link
        to="/login"
        className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-muted transition hover:border-chrome/40 hover:text-chrome-light sm:inline-flex"
      >
        <User className="h-4 w-4 shrink-0" />
        <span>Sign in</span>
      </Link>
    )
  }

  const firstName = user.fullName.split(' ')[0]

  const closeMenu = () => setOpen(false)

  const handleLogout = () => {
    closeMenu()
    logout()
    showToast('Signed out successfully.', 'success')
    navigate('/', { replace: true })
  }

  return (
    <div className="relative z-[102] hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="relative z-[102] flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-muted transition hover:border-chrome/40 hover:text-chrome-light"
      >
        <User className="h-4 w-4 shrink-0" />
        <span className="max-w-[7rem] truncate">{firstName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              key="profile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-label="Close profile menu"
              className="fixed inset-0 z-[100] cursor-default bg-void/20 backdrop-blur-[1px]"
              onClick={closeMenu}
            />

            <motion.div
              key="profile-menu-panel"
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 z-[101] mt-2 min-w-[14rem] overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/98 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="flex items-start gap-2 border-b border-white/8 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{user.fullName}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-chrome/40 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/5 hover:text-chrome-light"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthShell from './AuthShell'
import AuthTabs from './AuthTabs'
import { useAuth } from '../../context/AuthContext'
import { usePageTitle } from '../../hooks/usePageTitle'

const ease = [0.22, 1, 0.36, 1]

function cardContentVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.22 } },
      exit: { opacity: 0, transition: { duration: 0.18 } },
    }
  }
  return {
    initial: (direction) => ({
      opacity: 0,
      x: direction * 14,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.34, ease },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * -14,
      transition: { duration: 0.26, ease },
    }),
  }
}

export default function AuthPageShell() {
  const { pathname } = useLocation()
  const isRegister = pathname.includes('signup')
  const direction = isRegister ? 1 : -1
  const reduceMotion = useReducedMotion()
  const { isAuthenticated, bootstrapped } = useAuth()

  usePageTitle(isRegister ? 'Create Account' : 'Sign In')

  if (bootstrapped && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const title = isRegister ? 'Create account' : 'Sign in'

  const footer = isRegister ? (
    <>
      Have an account?{' '}
      <Link to="/login" className="font-medium text-chrome-light transition hover:text-chrome">
        Sign in
      </Link>
    </>
  ) : (
    <>
      New here?{' '}
      <Link to="/signup" className="font-medium text-chrome-light transition hover:text-chrome">
        Create account
      </Link>
    </>
  )

  return (
    <AuthShell
      compact
      showTrust={false}
      cardBody={
        <>
          <AuthTabs />
          <div className="relative overflow-x-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={pathname}
                custom={direction}
                variants={cardContentVariants(reduceMotion)}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
                <div className="mt-4">
                  <Outlet />
                </div>
                <div className="mt-5 border-t border-white/8 pt-4 text-center text-sm text-muted">{footer}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      }
    />
  )
}

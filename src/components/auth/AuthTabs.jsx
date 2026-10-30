import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/login', label: 'Sign in' },
  { to: '/signup', label: 'Register' },
]

export default function AuthTabs() {
  return (
    <div className="auth-tabs mb-5 flex rounded-full border border-white/10 bg-surface/80 p-1">
      {tabs.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative flex-1 rounded-full py-2.5 text-center text-sm font-medium transition-colors duration-300 ${
              isActive ? 'text-void' : 'text-muted hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="auth-tab-active"
                  className="absolute inset-0 rounded-full bg-linear-to-r from-chrome/90 to-chrome-light shadow-[0_0_24px_rgba(212,175,106,0.25)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}

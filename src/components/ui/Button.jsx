import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-linear-to-r from-chrome to-chrome-light text-void font-semibold hover:shadow-[0_0_40px_rgba(212,175,106,0.35)]',
  secondary: 'glass text-white hover:border-chrome/40 hover:text-chrome-light',
  ghost: 'text-muted hover:text-white hover:bg-white/5',
  accent: 'bg-accent text-white hover:shadow-[0_0_40px_var(--color-accent-glow)]',
  outline: 'border border-white/15 text-white hover:border-chrome/50 hover:text-chrome-light',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = motion.button,
  ...props
}) {
  return (
    <Component
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

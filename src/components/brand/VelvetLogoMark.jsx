import { useId } from 'react'

/**
 * Velvet Motors monogram — metallic ring + sculpted “V”
 */
export default function VelvetLogoMark({ className = 'h-10 w-10', title = 'Velvet Motors' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-ring`} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF8EB" />
          <stop offset="0.28" stopColor="#F0D9A8" />
          <stop offset="0.55" stopColor="#D4AF6A" />
          <stop offset="0.82" stopColor="#A88438" />
          <stop offset="1" stopColor="#6B5424" />
        </linearGradient>
        <radialGradient
          id={`${id}-disc`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(16 14) rotate(52) scale(34)"
        >
          <stop stopColor="#1E1C28" />
          <stop offset="0.55" stopColor="#0E0E14" />
          <stop offset="1" stopColor="#050508" />
        </radialGradient>
        <linearGradient id={`${id}-v`} x1="14" y1="13" x2="34" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF4DC" />
          <stop offset="0.4" stopColor="#F0D9A8" />
          <stop offset="0.75" stopColor="#D4AF6A" />
          <stop offset="1" stopColor="#B8923F" />
        </linearGradient>
        <linearGradient id={`${id}-v-shine`} x1="24" y1="14" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="24" cy="24" r="23" stroke={`url(#${id}-ring)`} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="20.25" fill={`url(#${id}-disc)`} stroke="rgba(212,175,106,0.22)" strokeWidth="0.75" />

      <path
        d="M14.2 15.2 24 33.8 33.8 15.2h3.4L24.9 36.2h-1.8L10.8 15.2h3.4Z"
        fill={`url(#${id}-v)`}
        filter={`url(#${id}-glow)`}
      />
      <path
        d="M17.2 15.2 24 27.4 30.8 15.2h2.1L24.4 31.2h-0.8L15.1 15.2h2.1Z"
        fill={`url(#${id}-v-shine)`}
        opacity="0.85"
      />

      <circle cx="24" cy="24" r="23" stroke="rgba(255,248,235,0.12)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}

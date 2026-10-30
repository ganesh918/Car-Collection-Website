import { Link, Outlet } from 'react-router-dom'
import SkipLink from '../SkipLink'
import VelvetLogoMark from '../brand/VelvetLogoMark'
import CarImage from '../ui/CarImage'
import { carImages } from '../../data/images'

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-void">
      <SkipLink />

      {/* Full-screen car background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <CarImage
          src={carImages.authSide}
          alt=""
          className="h-full w-full object-cover object-[55%_center]"
        />
        <div className="hero-grain absolute inset-0 bg-void/35" />
        <div className="absolute inset-0 bg-linear-to-r from-void/25 via-void/45 to-void/95" />
        <div className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-void/40" />
      </div>

      <header className="relative z-20 px-4 py-5 md:px-8 lg:px-12">
        <Link to="/" className="group inline-flex items-center gap-3 transition hover:opacity-90">
          <VelvetLogoMark className="h-10 w-10 transition duration-500 group-hover:scale-[1.04]" />
          <div className="leading-tight">
            <span className="font-display text-lg font-bold text-white">Velvet</span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-muted">Motors</span>
          </div>
        </Link>
      </header>

      <main id="main-content" className="relative z-10" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}

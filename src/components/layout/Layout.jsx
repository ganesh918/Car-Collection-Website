import { Outlet } from 'react-router-dom'
import SkipLink from '../SkipLink'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1 pt-18 lg:pt-20" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

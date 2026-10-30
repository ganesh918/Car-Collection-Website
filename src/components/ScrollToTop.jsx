import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function isAuthTabPath(path) {
  return path === '/login' || path === '/signup'
}

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (isAuthTabPath(pathname) && isAuthTabPath(previousPath.current)) {
      previousPath.current = pathname
      return
    }
    previousPath.current = pathname
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return null
}

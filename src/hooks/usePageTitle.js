import { useEffect } from 'react'

const SITE = 'Velvet Motors'

export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Premium Car Collection`
    return () => {
      document.title = previous
    }
  }, [title])
}

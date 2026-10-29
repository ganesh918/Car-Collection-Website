import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const MAX_COMPARE = 3
const ComparisonContext = createContext(null)

export function ComparisonProvider({ children }) {
  const [ids, setIds] = useLocalStorage('velvet-compare', [])

  const value = useMemo(
    () => ({
      compareIds: ids,
      maxCompare: MAX_COMPARE,
      isInCompare: (id) => ids.includes(id),
      addToCompare: (id) => {
        setIds((prev) => {
          if (prev.includes(id)) return prev
          if (prev.length >= MAX_COMPARE) return [...prev.slice(1), id]
          return [...prev, id]
        })
      },
      removeFromCompare: (id) => setIds((prev) => prev.filter((x) => x !== id)),
      clearCompare: () => setIds([]),
      toggleCompare: (id) => {
        setIds((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id)
          if (prev.length >= MAX_COMPARE) return [...prev.slice(1), id]
          return [...prev, id]
        })
      },
    }),
    [ids, setIds],
  )

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>
}

export function useComparison() {
  const ctx = useContext(ComparisonContext)
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider')
  return ctx
}

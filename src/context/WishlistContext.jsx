import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('velvet-wishlist', [])

  const value = useMemo(
    () => ({
      wishlistIds: ids,
      isWishlisted: (id) => ids.includes(id),
      toggleWishlist: (id) => {
        setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
      },
      removeFromWishlist: (id) => setIds((prev) => prev.filter((x) => x !== id)),
      clearWishlist: () => setIds([]),
    }),
    [ids, setIds],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

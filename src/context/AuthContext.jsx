import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  authenticateUser,
  clearSession,
  getSession,
  registerUser,
  setSession,
} from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [bootstrapped, setBootstrapped] = useState(false)

  useEffect(() => {
    setUser(getSession())
    setBootstrapped(true)
  }, [])

  const login = useCallback(({ email, password }) => {
    const result = authenticateUser({ email, password })
    if (!result.ok) return result
    const session = setSession(result.user)
    setUser(session)
    return { ok: true, user: session }
  }, [])

  const register = useCallback(({ fullName, email, password }) => {
    const result = registerUser({ fullName, email, password })
    if (!result.ok) return result
    const session = setSession(result.user)
    setUser(session)
    return { ok: true, user: session }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      bootstrapped,
      login,
      register,
      logout,
    }),
    [user, bootstrapped, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

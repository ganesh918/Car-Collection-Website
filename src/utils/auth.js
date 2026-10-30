const USERS_KEY = 'velvet-auth-users'
const SESSION_KEY = 'velvet-auth-session'
const RESET_KEY = 'velvet-auth-reset-requests'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(user) {
  const session = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    loggedInAt: new Date().toISOString(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function registerUser({ fullName, email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  const users = readUsers()
  if (users.some((u) => u.email === normalizedEmail)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  const user = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  }
  writeUsers([user, ...users])
  return { ok: true, user }
}

export function authenticateUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  const user = readUsers().find((u) => u.email === normalizedEmail)
  if (!user || user.password !== password) {
    return { ok: false, error: 'Invalid email or password.' }
  }
  return { ok: true, user }
}

export async function requestPasswordReset(email) {
  await new Promise((r) => setTimeout(r, 500))
  const normalizedEmail = email.trim().toLowerCase()
  const users = readUsers()
  const exists = users.some((u) => u.email === normalizedEmail)
  try {
    const existing = JSON.parse(localStorage.getItem(RESET_KEY) || '[]')
    localStorage.setItem(
      RESET_KEY,
      JSON.stringify(
        [
          { email: normalizedEmail, requestedAt: new Date().toISOString(), exists },
          ...existing,
        ].slice(0, 20),
      ),
    )
  } catch {
    /* ignore */
  }
  return { ok: true, exists }
}

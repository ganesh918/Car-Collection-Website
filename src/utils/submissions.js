const STORAGE_PREFIX = 'velvet-submissions'

export async function submitForm(type, payload) {
  await new Promise((resolve) => setTimeout(resolve, 650))
  const key = `${STORAGE_PREFIX}-${type}`
  const record = {
    ...payload,
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    submittedAt: new Date().toISOString(),
  }
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([record, ...existing].slice(0, 50)))
  } catch {
    /* storage full or private mode */
  }
  return record
}

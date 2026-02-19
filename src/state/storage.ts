const STORAGE_VERSION = 1

type StoredState<T> = {
  version: number
  value: T
}

export const loadState = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as StoredState<T>
    if (parsed.version !== STORAGE_VERSION) return fallback
    return parsed.value
  } catch {
    return fallback
  }
}

export const saveState = <T>(key: string, value: T) => {
  const wrapped: StoredState<T> = { version: STORAGE_VERSION, value }
  localStorage.setItem(key, JSON.stringify(wrapped))
}

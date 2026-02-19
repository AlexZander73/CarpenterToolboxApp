import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type RecentItem = {
  id: string
  type: "formula" | "lesson" | "reference" | "calculator"
  title: string
  timestamp: number
}

const STORAGE_KEY = "ccau_recents"
const MAX_RECENTS = 12

export const useRecents = () => {
  const [recents, setRecents] = useState<RecentItem[]>(() =>
    loadState(STORAGE_KEY, []),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, recents)
  }, [recents])

  const addRecent = (item: Omit<RecentItem, "timestamp">) => {
    setRecents((prev) => {
      const filtered = prev.filter(
        (existing) => !(existing.id === item.id && existing.type === item.type),
      )
      return [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENTS)
    })
  }

  return { recents, addRecent }
}

import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type FavoriteItem = {
  id: string
  type: "formula" | "lesson" | "reference" | "preset" | "tool"
  title: string
}

const STORAGE_KEY = "ccau_favorites"

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() =>
    loadState(STORAGE_KEY, []),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, favorites)
  }, [favorites])

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id && fav.type === item.type)
      if (exists) {
        return prev.filter((fav) => !(fav.id === item.id && fav.type === item.type))
      }
      return [item, ...prev]
    })
  }

  const isFavorite = (id: string, type: FavoriteItem["type"]) =>
    favorites.some((fav) => fav.id === id && fav.type === type)

  return { favorites, toggleFavorite, isFavorite }
}

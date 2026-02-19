import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type Settings = {
  lengthUnit: "mm" | "cm" | "m"
  rounding: {
    length: number
    angle: number
    area: number
    volume: number
  }
  roundingMode: "fixed" | "practical"
  practicalStep: number
  wastePercent: number
  theme: "light" | "dark" | "system"
}

const DEFAULT_SETTINGS: Settings = {
  lengthUnit: "mm",
  rounding: {
    length: 2,
    angle: 2,
    area: 3,
    volume: 3,
  },
  roundingMode: "fixed",
  practicalStep: 0.005,
  wastePercent: 10,
  theme: "system",
}

const STORAGE_KEY = "ccau_settings"

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() =>
    loadState(STORAGE_KEY, DEFAULT_SETTINGS),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, settings)
    const root = document.documentElement
    const applyTheme = (mode: "light" | "dark") => {
      if (mode === "dark") root.classList.add("dark")
      else root.classList.remove("dark")
    }

    if (settings.theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      applyTheme(prefersDark.matches ? "dark" : "light")
      const listener = (event: MediaQueryListEvent) =>
        applyTheme(event.matches ? "dark" : "light")
      prefersDark.addEventListener("change", listener)
      return () => prefersDark.removeEventListener("change", listener)
    }

    applyTheme(settings.theme)
  }, [settings])

  return { settings, setSettings }
}

import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type PinnedCalculator = {
  id: string
  title: string
  formulaId: string
}

const STORAGE_KEY = "ccau_pins"
const MAX_PINS = 6

export const usePins = () => {
  const [pins, setPins] = useState<PinnedCalculator[]>(() =>
    loadState(STORAGE_KEY, []),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, pins)
  }, [pins])

  const togglePin = (pin: PinnedCalculator) => {
    setPins((prev) => {
      const exists = prev.find((item) => item.id === pin.id)
      if (exists) {
        return prev.filter((item) => item.id !== pin.id)
      }
      if (prev.length >= MAX_PINS) return prev
      return [pin, ...prev]
    })
  }

  const isPinned = (id: string) => pins.some((pin) => pin.id === id)

  return { pins, togglePin, isPinned }
}

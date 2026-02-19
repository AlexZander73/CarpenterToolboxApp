import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type CalculatorPreset = {
  id: string
  calculatorId: string
  formulaId: string
  name: string
  inputs: Record<string, number | string>
  createdAt: number
}

const STORAGE_KEY = "ccau_presets"

export const usePresets = () => {
  const [presets, setPresets] = useState<CalculatorPreset[]>(() =>
    loadState(STORAGE_KEY, []),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, presets)
  }, [presets])

  const addPreset = (preset: CalculatorPreset) => {
    setPresets((prev) => [preset, ...prev])
  }

  const removePreset = (id: string) => {
    setPresets((prev) => prev.filter((preset) => preset.id !== id))
  }

  const listByCalculator = (calculatorId: string) =>
    presets.filter((preset) => preset.calculatorId === calculatorId)

  return { presets, addPreset, removePreset, listByCalculator }
}

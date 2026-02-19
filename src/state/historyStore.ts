import { useEffect, useState } from "react"
import { loadState, saveState } from "./storage"

export type CalculatorRun = {
  id: string
  calculatorId: string
  inputs: Record<string, number | string>
  outputs: Record<string, number>
  timestamp: number
}

const STORAGE_KEY = "ccau_history"
const MAX_HISTORY = 30

export const useHistory = () => {
  const [history, setHistory] = useState<CalculatorRun[]>(() =>
    loadState(STORAGE_KEY, []),
  )

  useEffect(() => {
    saveState(STORAGE_KEY, history)
  }, [history])

  const addRun = (run: CalculatorRun) => {
    setHistory((prev) => [run, ...prev].slice(0, MAX_HISTORY))
  }

  const listByCalculator = (calculatorId: string) =>
    history.filter((run) => run.calculatorId === calculatorId)

  return { history, addRun, listByCalculator }
}

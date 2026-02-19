import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../data/db"
import type { CalculationEntry } from "../data/db/models"
import Button from "../components/ui/Button"

const CalculationSlip = () => {
  const { calcId } = useParams()
  const [entry, setEntry] = useState<CalculationEntry | null>(null)

  useEffect(() => {
    if (!calcId) return
    db.calculations.get(calcId).then((result) => setEntry(result ?? null))
  }, [calcId])

  if (!entry) return null

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 bg-white p-8 text-slate-900">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-xl font-semibold">Calculation Slip</h1>
        <Button variant="secondary" onClick={() => window.print()}>
          Print / Save PDF
        </Button>
      </div>
      <h2 className="text-lg font-semibold">{entry.calculatorName}</h2>
      <p className="text-xs text-slate-600">
        {new Date(entry.timestamp).toLocaleString()}
      </p>
      {entry.label && <p className="text-sm">Label: {entry.label}</p>}
      {entry.contextNote && <p className="text-sm">Note: {entry.contextNote}</p>}
      <div>
        <p className="text-xs font-semibold text-slate-600">Inputs</p>
        <pre className="text-xs">{JSON.stringify(entry.inputs, null, 2)}</pre>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-600">Outputs</p>
        <pre className="text-xs">{JSON.stringify(entry.outputs, null, 2)}</pre>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-600">Rounding</p>
        <pre className="text-xs">{JSON.stringify(entry.rounding, null, 2)}</pre>
      </div>
      <footer className="pt-4 text-xs text-slate-500">
        Study tool only, not professional advice.
      </footer>
    </div>
  )
}

export default CalculationSlip
